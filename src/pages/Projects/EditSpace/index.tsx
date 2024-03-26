import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { MainLayout, MiddleLayout } from '../../../Layout'
import { InputInfoSpace, LinkButton, SelectInfoSpace, SubmitButton } from '../../../components'
import  { fetchSpaceById, updateSpaceById } from '../../../api'
import addTipology from '../../../assets/icons/add-tipology.png'
import addComment from '../../../assets/icons/add-comment.png'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { LoadingContext } from '../../../context/LoadingContext'
import { validateSpaceForm } from '../../../helpers/validateSpaceForm'
import { translateSpace } from '../../../helpers/translateSpace'
import { SingleSpace } from '../../../types/Spaces'

interface ImagePreview {
  url: string,
  name: string,
}

const initialImagePreview: ImagePreview = {
  url: '',
  name: ''
}

export const EditSpace = () => {

  const [spaceToEdit, setSpaceToEdit] = useState<SingleSpace>({
    spacetype: '',
    roomnumber: 1,
    spaceid: 0
  })
  const { setLoading, error, setError } = useContext(LoadingContext)
  const { projectid, typologyid, spaceid } = useParams()

  useEffect(() => {
    if (spaceid) {
      setLoading(true)
      try {
        fetchSpaceById(spaceid)
          .then((data) => {
            setSpaceToEdit(data.data)
            setImagePreview3D({
              url: data.data.image3d,
              name: ''
            })
            setImagePreviewactualstatus({
              url: data.data.actualstatus,
              name: ''
            })
            setLoading(false)
          })
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }


  }, [spaceid, setLoading])

  console.log(spaceToEdit);
  

  const [formDataSpaceTypo, setFormDataSpaceTypo] = useState<FormData>(new FormData)
  const [imagePreview3D, setImagePreview3D] = useState<ImagePreview>(initialImagePreview);
  const [imagePreviewactualstatus, setImagePreviewactualstatus] = useState<ImagePreview>(initialImagePreview);
  const [comment, setComment] = useState(false)


  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (!spaceid || !spaceToEdit) {
      console.log("NO HAY ID DE TIPOLOGIA");
      setLoading(false)
      return
    }

    // Valida que el formulario este completo
    if (!validateSpaceForm(spaceToEdit)) {
      console.log("Faltan datos");
      setError("Todos los campos son obligatorios")
      setLoading(false)
      setTimeout(() => {
        setError('')
      }, 4000);
      return
    }

    const jsonBlobSpace = new Blob([JSON.stringify(spaceToEdit)], { type: 'application/json' });
    formDataSpaceTypo.append('space', jsonBlobSpace, 'space.json')

    try {
      updateSpaceById(spaceid, formDataSpaceTypo)
        .then(() => {
          setFormDataSpaceTypo(new FormData)
          setImagePreview3D(initialImagePreview)
          setImagePreviewactualstatus(initialImagePreview)
          setComment(false)
        })
        .then(() => {
          setLoading(false)
          navigate(`/new-project/${projectid}/${typologyid}/summary`)
        })
    } catch (err) {
      setLoading(false)
      console.log(" Error al enviar el form: ", err);
    }
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return
    }
    formDataSpaceTypo.append(e.target.name, file)

    if (file) {
      // Leer el contenido del archivo y mostrar una vista previa de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        if (e.target.name === 'image3d') {
          setImagePreview3D({
            url: reader.result as string,
            name: file.name
          })
        } else {
          setImagePreviewactualstatus({
            url: reader.result as string,
            name: file.name
          })
        }

      };
      reader.readAsDataURL(file);
    }
  }

  const handleSpace = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

    setSpaceToEdit((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }
  

  if (!spaceid) { return <Navigate to={`/new-project/${projectid}/${typologyid}/summary`} replace /> }

  return (
    <MainLayout>

      <MiddleLayout>
        <h2 className="font-outfit text-2xl text-vivvi">Edita la información del espacio</h2>

        <form className="flex flex-col gap-6 w-6/12">
          <h3 className='font-roboto text-xl text-vivvi font-semibold mb-4'> {spaceToEdit?.spacetype && translateSpace(spaceToEdit.spacetype)} {spaceToEdit?.roomnumber && spaceToEdit?.roomnumber > 1 && spaceToEdit?.roomnumber} </h3>
          <div>
            <div>
              <p className='font-medium'>Información tipología existente (obligatorio)</p>
            </div>
            <div className='flex gap-6 mt-4'>
              <div className="flex flex-col gap-4 w-4/12">
                <div className='bg-white border border-platinum rounded-md flex flex-col justify-center items-center overflow-hidden h-52'>
                  <div className='p-2  flex flex-col items-center overflow-hidden'>
                    <label htmlFor={`image3d`} className='flex flex-col items-center cursor-pointer'>
                      <img src={imagePreview3D?.url ? imagePreview3D.url : addTipology} className={` ${imagePreview3D?.url ? 'w-full' : 'w-1/2'}`} />
                      {imagePreview3D?.url
                        ?
                        null
                        :
                        'Cargar imagen 3D'}
                    </label>
                    <input id={`image3d`} name={'image3d'} type='file' onChange={handleImage} className='hidden' />

                  </div>
                </div>
                <div className='bg-white border border-platinum rounded-md flex flex-col justify-center items-center overflow-hidden'>
                  <div className='p-2 flex flex-col items-center overflow-hidden'>
                    <label htmlFor={`actualstatus`} className='flex flex-col items-center cursor-pointer'>
                      <img src={imagePreviewactualstatus?.url ? imagePreviewactualstatus.url : addTipology} className={` ${imagePreviewactualstatus?.url ? 'w-full' : 'w-1/3'}`} />
                      {imagePreviewactualstatus?.url
                        ?
                        null
                        :
                        <p className="text-center">Cargar fotos estado actual</p>}
                    </label>
                    <input id={`actualstatus`} name={'actualstatus'} type='file' onChange={handleImage} className='hidden' />
                  </div>
                </div>
                <div className='bg-white border border-platinum rounded-md flex gap-4 items-center overflow-hidden p-2 cursor-pointer' onClick={() => setComment(!comment)}>
                  <label>
                    <img src={addComment} alt="Agregar comentario" />
                  </label>
                  <p>Agregar comentario</p>
                </div>
              </div>
              <div className='w-8/12 flex flex-col gap-1'>

                {/* TIPOLOGIAS */}

                {
                  spaceToEdit?.spacetype === 'kitchen'
                    ?
                    <SelectInfoSpace handle={handleSpace} options={["1", "2"]} value={spaceToEdit?.spacetypology} />
                    :
                    spaceToEdit?.spacetype === 'clothes'
                      ?
                      <SelectInfoSpace handle={handleSpace} options={["1", "2"]} value={spaceToEdit?.spacetypology} />
                      :
                      ''
                }

                {/* AREA */}
                <InputInfoSpace value={spaceToEdit.area} handle={handleSpace} name={'area'} label={'Área'} unit={'m2'} />

                {/* DEMOLICIONES */}
                {spaceToEdit?.spacetype === 'kitchen' && <InputInfoSpace value={spaceToEdit?.demolitions} handle={handleSpace} name={'demolitions'} label={'Demoliciones (opcional)'} unit={'m2'} />}

                {/* MUROS */}
                {spaceToEdit?.spacetype === 'kitchen' && <InputInfoSpace value={spaceToEdit?.walls} handle={handleSpace} name={'walls'} label={'Muros (opcional)'} unit={'m2'} />}

                {/* MUEBLE BAJO */}
                {spaceToEdit?.spacetype === 'kitchen' && <InputInfoSpace value={spaceToEdit?.lowercabinetml} handle={handleSpace} name={'lowercabinetml'} label={'Mueble bajo'} unit={'ml'} />}

                {/* PUERTA CORREDIZA */}
                {spaceToEdit?.spacetype === 'clothes' && <InputInfoSpace value={spaceToEdit?.slidingdoor} handle={handleSpace} name={'slidingdoor'} label={'Puerta Corrediza'} unit={'ml'} />}

                {/* ALACENA */}
                {spaceToEdit?.spacetype === 'kitchen' && <InputInfoSpace value={spaceToEdit.cubboard} handle={handleSpace} name={'cubboard'} label={'Alacena'} unit={'ml'} />}
                {spaceToEdit?.spacetype === 'clothes' && <InputInfoSpace value={spaceToEdit.cubboard} handle={handleSpace} name={'cubboard'} label={'Alacena'} unit={'ml'} />}

                {/* ISLA O BARRA */}
                {spaceToEdit?.spacetype === 'kitchen' && <InputInfoSpace value={spaceToEdit.islandorbar} handle={handleSpace} name={'islandorbar'} label={'Isla o barra (opcional)'} unit={'ml'} />}

                {/* MUEBLE BAÑO */}
                {spaceToEdit?.spacetype === 'bathRoomWithShower' && <InputInfoSpace value={spaceToEdit.bathroomfurniture} handle={handleSpace} name={'bathroomfurniture'} label={'Mueble baño'} unit={'ml'} />}
                {spaceToEdit?.spacetype === 'socialBathRoomWithoutShower' && <InputInfoSpace value={spaceToEdit.bathroomfurniture} handle={handleSpace} name={'bathroomfurniture'} label={'Mueble baño'} unit={'ml'} />}


                {/* DIVISION DUCHA */}
                {spaceToEdit?.spacetype === 'bathRoomWithShower' && <InputInfoSpace value={spaceToEdit.showerdivision} handle={handleSpace} name={'showerdivision'} label={'Division ducha'} unit={'ml'} />}

                {/* CLOSET */}
                {spaceToEdit?.spacetype === 'bedRoom' && <InputInfoSpace value={spaceToEdit.closetml} handle={handleSpace} name={'closetml'} label={'Closet'} unit={'ml'} />}


                {/* CIERLO RASO */}
                {spaceToEdit?.spacetype === 'bathRoomWithShower' && <InputInfoSpace value={spaceToEdit.ceilingr} handle={handleSpace} name={'ceilingr'} label={'Cielo raso'} unit={'ml'} />}
                {spaceToEdit?.spacetype === 'bedRoom' && <InputInfoSpace value={spaceToEdit.ceilingr} handle={handleSpace} name={'ceilingr'} label={'Cielo raso'} unit={'ml'} />}

                {/* MURO ENCHAPADO */}

                {spaceToEdit?.spacetype === 'socialBathRoomWithoutShower' && <InputInfoSpace value={spaceToEdit.veneeredwall} handle={handleSpace} name={'veneeredwall'} label={'Muro enchapado'} unit={'ml'} />}



                {/* Escritorio */}
                {spaceToEdit?.spacetype === 'study' && <InputInfoSpace value={spaceToEdit.deskml} handle={handleSpace} name={'deskml'} label={'Escritorio'} unit={'ml'} />}

                {/* Mueble TV o biblioteca */}
                {spaceToEdit?.spacetype === 'study' && <InputInfoSpace value={spaceToEdit.furnituretvlibrary} handle={handleSpace} name={'furnituretvlibrary'} label={'Mueble (tv o biblioteca)'} unit={'ml'} />}
                {spaceToEdit?.spacetype === 'diningRoom' && <InputInfoSpace value={spaceToEdit.furnituretvlibrary} handle={handleSpace} name={'furnituretvlibrary'} label={'Mueble (tv o biblioteca)'} unit={'ml'} />}

                {/* REPISA */}
                {spaceToEdit?.spacetype === 'study' && <InputInfoSpace value={spaceToEdit.shelf} handle={handleSpace} name={'shelf'} label={'Repisa'} unit={'ml'} />}

              </div>
            </div>
            {comment
              &&
              <>
                <label className="mx-2 font-roboto font-normal text-lg text-battleGray">Comentario</label>
                <input name="commentuser" value={spaceToEdit?.commentuser} className='bg-white border border-platinum rounded-md w-full  flex flex-col justify-center items-center overflow-hidden h-20 p-4' onChange={handleSpace} />
              </>
            }
          </div>
          {error
            &&
            <div className='bg-red-300 p-4'>
              <p> {error} </p>
            </div>

          }
          <div className=" flex gap-5">
            <SubmitButton handle={handleSubmit} bg={'golden'}>
              Guardar edición
            </SubmitButton>
            <LinkButton link={`/new-project/${projectid}/${typologyid}/summary`} bg="">
              Cancelar
            </LinkButton>
          </div>
        </form>
      </MiddleLayout>
    </MainLayout>
  )
}
