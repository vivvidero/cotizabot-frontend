import { FormEvent, useContext, useEffect, useState } from 'react'
import { MainLayout, MiddleLayout } from '../../Layout'
import { AdminProgressBar, AdminSpacesInfo, LinkButton, NewProjectModal } from '../../components'
import check from '../../assets/icons/check.png'
import api from '../../api'

import { SingleSpace, Spaces } from '../../types/Spaces'
import { useNavigate } from 'react-router-dom'
import { NewProjectContext } from '../../context'

export const AdminSpaceInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spaces, setSpaces] = useState<Spaces[]>([])
  const [progressCounter, setProgressCounter] = useState<number>(1)
  const [space, setSpace] = useState<SingleSpace>({
    spaceType: spaces[progressCounter]?.name,
    roomNumber: spaces[progressCounter]?.roomNumber,
    spaceId: spaces[progressCounter]?.spaceId
  })
  const { newProject } = useContext(NewProjectContext)
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!newProject.activeTypologyId) {
      console.log("NO HAY ID DE TIPOLOGIA");
      return
    }

    // POST ESPACIO
    api.post('/spaces', { typologyId: newProject.activeTypologyId, ...space, })
      .then((data) => {
        console.log(data.data);
      })


    if (progressCounter === spaces.length) {
      navigate('/new-project/summary')
    } else {
      setProgressCounter((prevState) => prevState + 1)
      localStorage.setItem('progressCounter', JSON.stringify(progressCounter + 1))
    }
  }

  const handleBackSpace = (e) => {
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

  console.log(space);


  return (
    <MainLayout>
      <AdminProgressBar progress={isModalOpen ? 5 : 4} />
      <MiddleLayout>
        <h2 className="font-outfit text-2xl text-vivvi">Ingresa la información de cada espacio</h2>
        <div className='p-1 px-6 rounded-md bg-honeydew text-vivvi font-roboto text-xl font-medium m-4'>
          <p> {progressCounter}/{spaces.length} </p>
        </div>
        <form className="flex flex-col gap-6 w-6/12">
          <AdminSpacesInfo spaces={spaces} space={space} setSpace={setSpace} progressCounter={progressCounter - 1} />
          <div className=" flex gap-5">
            {
              progressCounter > 1
              &&
              <button className='flex items-center justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border border-vivvi' onClick={handleBackSpace}>
                Espacio anterior
              </button>
            }
            <button onClick={handleSubmit} className={`flex items-center justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi`}>
              {progressCounter === spaces.length ? 'Finalizar' : 'Siguiente espacio'}
            </button>
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
