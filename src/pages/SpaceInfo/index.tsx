import { FormEvent, useContext, useEffect, useState } from 'react'
import { MainLayout, MiddleLayout } from '../../Layout'
import { AdminProgressBar, LinkButton, NewProjectModal, SpacesInfo, SubmitButton } from '../../components'
import check from '../../assets/icons/check.png'
import api from '../../api'
import { SingleSpace, Spaces } from '../../types/Spaces'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingContext } from '../../context/LoadingContext'
import { validateSpaceForm } from '../../helpers/validateSpaceForm'

interface ImagePreview {
  url: string,
  name: string,
}

const initialImagePreview: ImagePreview = {
  url: '',
  name: ''
}

export const SpaceInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spaces, setSpaces] = useState<Spaces[]>([])
  const [progressCounter, setProgressCounter] = useState<number>(1)
  const [space, setSpace] = useState<SingleSpace>({
    spacetype: spaces[progressCounter]?.name,
    roomnumber: spaces[progressCounter]?.roomnumber,
    spaceid: spaces[progressCounter]?.spaceid
  })
  const [formDataSpaceTypo, setFormDataSpaceTypo] = useState<FormData>(new FormData)
  const [imagePreview3D, setImagePreview3D] = useState<ImagePreview>(initialImagePreview);
  const [imagePreviewactualstatus, setImagePreviewactualstatus] = useState<ImagePreview>(initialImagePreview);
  const [comment, setComment] = useState(false)

  const { setLoading, error, setError } = useContext(LoadingContext)

  const { projectid, typologyid } = useParams()


  const navigate = useNavigate()

  /*   Maneja el envío del formulario para guardar la información del espacio.*/
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (!typologyid) {
      console.log("NO HAY ID DE TIPOLOGIA");
      setLoading(false)
      return
    }

    // Valida que el formulario este completo
    if (!validateSpaceForm(space)) {
      console.log("Faltan datos");
      setError("Todos los campos son obligatorios")
      setLoading(false)
      setTimeout(() => {
        setError('')
      }, 4000);
      return
    }

    const jsonBlobSpace = new Blob([JSON.stringify(space)], { type: 'application/json' });
    const jsonBlobTypologyId = new Blob([JSON.stringify({ typologyId: typologyid })], { type: 'application/json' });

    formDataSpaceTypo.append('space', jsonBlobSpace, 'space.json')
    formDataSpaceTypo.append('typologyId', jsonBlobTypologyId, 'typologyId.json')

    try {
      api.post('/spaces', formDataSpaceTypo)
        .then(() => {
          setSpace({
            spacetype: spaces[progressCounter]?.name,
            roomnumber: spaces[progressCounter]?.roomnumber,
            spaceid: spaces[progressCounter]?.spaceid
          })
          setFormDataSpaceTypo(new FormData)
          setImagePreview3D(initialImagePreview)
          setImagePreviewactualstatus(initialImagePreview)
          setComment(false)
        })
        .then(() => {
          setLoading(false)
          if (progressCounter === spaces.length) {
            navigate(`/new-project/${projectid}/${typologyid}/summary`)
          } else {
            setProgressCounter((prevState) => prevState + 1)
            localStorage.setItem('progressCounter', JSON.stringify(progressCounter + 1))
          }
        })
    } catch (err) {
      setLoading(false)
      console.log(" Error al enviar el form: ", err);
    }
  }

  // Maneja la navegación al espacio anterior.
  const handleBackSpace = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    localStorage.setItem('progressCounter', JSON.stringify(progressCounter - 1))
    setProgressCounter((prevState) => prevState - 1)
  }

  useEffect(() => {
    const progressLocalStorage = localStorage.getItem('progressCounter')

    if (progressLocalStorage) {
      setProgressCounter(JSON.parse(progressLocalStorage))
    } else {
      setProgressCounter(1)
    }
  }, [])

  useEffect(() => {
    const localSpaces = localStorage.getItem('newProjectSpaces')

    if (localSpaces) {
      setSpaces(JSON.parse(localSpaces))
    }
  }, [])

  return (
    <MainLayout>
      <AdminProgressBar progress={isModalOpen ? 5 : 4} />
      <MiddleLayout>
        <h2 className="font-outfit text-2xl text-vivvi">Ingresa la información de cada espacio</h2>
        <div className='p-1 px-6 rounded-md bg-honeydew text-vivvi font-roboto text-xl font-medium m-4'>
          <p> {progressCounter}/{spaces.length} </p>
        </div>
        <form className="flex flex-col gap-6 w-6/12">
          <SpacesInfo comment={comment} setComment={setComment} spaces={spaces} space={space} setSpace={setSpace} progressCounter={progressCounter - 1} setFormDataSpaceTypo={setFormDataSpaceTypo} formDataSpaceTypo={formDataSpaceTypo} imagePreview3D={imagePreview3D} imagePreviewactualstatus={imagePreviewactualstatus} setImagePreview3D={setImagePreview3D} setImagePreviewactualstatus={setImagePreviewactualstatus} />
          {
            error
            &&
            <div className='bg-red-300 p-4'>
              <p> {error} </p>
            </div>
          }

          <div className=" flex gap-5">
            {
              progressCounter > 1
              &&
              <button className='flex items-center justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border border-vivvi' onClick={handleBackSpace}>
                Espacio anterior
              </button>
            }
            <SubmitButton handle={handleSubmit} bg={'golden'}>
              {progressCounter === spaces.length ? 'Finalizar' : 'Siguiente espacio'}
            </SubmitButton>
            <LinkButton link="/" bg="">
              Cancelar
            </LinkButton>
          </div>
        </form>
        <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className='text-3xl font-roboto mb-4'>Proyecto guardado 🔥</h2>
          <div>
            <img src={check} alt='check' />
          </div>
          <LinkButton link="/admin/projects" bg="golden">
            Finalizar
          </LinkButton>
        </NewProjectModal>
      </MiddleLayout>
    </MainLayout>
  )
}
