import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { SingleSpace, Spaces } from "../../types/Spaces"
import { translateSpace } from "../../helpers/translateSpace";
import addTipology from '../../assets/icons/add-tipology.png'
import addComment from '../../assets/icons/add-comment.png'
import { InputInfoSpace, SelectInfoSpace } from "..";
import { AddTipologyButton } from "../ui/AddTipologyButton/AddTipologyButton";

interface Props {
    spaces: Spaces[],
    progressCounter: number
    space: SingleSpace
    setSpace: Dispatch<SetStateAction<SingleSpace>>
}

interface ImagePreview {
    url: string,
    name: string
}

export const AdminSpacesInfo: FC<Props> = ({ spaces, progressCounter, space, setSpace }) => {

    const [imagePreview3D, setImagePreview3D] = useState<ImagePreview>();
    const [imagePreviewactualstatus, setImagePreviewactualstatus] = useState<ImagePreview>();
    const [comment, setComment] = useState(false)

    useEffect(() => {
        setSpace({
            spacetype: spaces[progressCounter]?.name,
            roomnumber: spaces[progressCounter]?.roomnumber,
            spaceid: spaces[progressCounter]?.spaceid
        })
    }, [progressCounter, spaces, setSpace])

    useEffect(() => {
        setImagePreview3D({
            url: '',
            name: ''
        })
        setImagePreviewactualstatus({
            url: '',
            name: ''
        })
    }, [progressCounter])


    const handleSpace = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

        setSpace((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return
        }

        const formData = new FormData();
        formData.append('image', file);

        setSpace((prevState) => {
            return {
                ...prevState,
                [e.target.name]: formData
            }
        })
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

    console.log(space);


    return (
        <>
            <h3 className='font-roboto text-xl text-vivvi font-semibold mb-4'> {translateSpace(spaces[progressCounter]?.name)} {spaces[progressCounter]?.roomnumber > 1 && spaces[progressCounter]?.roomnumber} </h3>
            <div>
                <div>
                    <p className='font-medium'>Información tipología existente (obligatorio)</p>
                </div>
                <div className='flex gap-6 mt-4'>
                    <div className="flex flex-col gap-4 w-4/12">
                        <div className='bg-white border border-platinum rounded-md flex flex-col justify-center items-center overflow-hidden h-52'>
                            <div className='p-2  flex flex-col items-center overflow-hidden'>
                                <label htmlFor={`${spaces[progressCounter]?.name}image3d`} className='flex flex-col items-center cursor-pointer'>
                                    <img src={imagePreview3D?.url && space?.image3d ? imagePreview3D.url : addTipology} className={` ${space?.image3d ? 'w-full' : 'w-1/2'}`} />
                                    {imagePreview3D?.url && space?.image3d
                                        ?
                                        <p>{space?.image3d?.name}</p>
                                        :
                                        'Cargar imagen 3D'}
                                </label>
                                <input id={`${spaces[progressCounter]?.name}image3d`} name={'image3d'} type='file' onChange={handleImage} className='hidden' />
                                <p> {imagePreview3D?.url && space?.image3d ? imagePreview3D?.name : ''} </p>
                            </div>
                        </div>
                        <div className='bg-white border border-platinum rounded-md flex flex-col justify-center items-center overflow-hidden'>
                            <div className='p-2 flex flex-col items-center overflow-hidden'>
                                <label htmlFor={`${spaces[progressCounter]?.name}actualstatus`} className='flex flex-col items-center cursor-pointer'>
                                    <img src={imagePreviewactualstatus?.url && space?.actualstatus ? imagePreviewactualstatus.url : addTipology} className={` ${space?.actualstatus ? 'w-full' : 'w-1/3'}`} />
                                    {imagePreviewactualstatus?.url && space?.actualstatus
                                        ?
                                        <p>{space?.actualstatus?.name}</p>
                                        :
                                        <p className="text-center">Cargar fotos estado actual</p>}
                                </label>
                                <input id={`${spaces[progressCounter]?.name}actualstatus`} name={'actualstatus'} type='file' onChange={handleImage} className='hidden' />
                                <p> {imagePreviewactualstatus?.url && space?.actualstatus ? imagePreviewactualstatus?.name : ''} </p>
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
                            spaces[progressCounter]?.name === 'kitchen'
                                ?
                                <SelectInfoSpace handle={handleSpace} options={["1", "2"]} />
                                :
                                spaces[progressCounter]?.name === 'clothes'
                                    ?
                                    <SelectInfoSpace handle={handleSpace} options={["1", "2", "3"]} />
                                    :
                                    ''
                        }

                        {/* AREA */}
                        <InputInfoSpace handle={handleSpace} name={'area'} label={'Área'} unit={'m2'} />

                        {/* DEMOLICIONES */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace handle={handleSpace} name={'demolitions'} label={'Demoliciones (opcional)'} unit={'m2'} />}

                        {/* MUROS */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace handle={handleSpace} name={'walls'} label={'Muros (opcional)'} unit={'m2'} />}

                        {/* MUEBLE BAJO */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace handle={handleSpace} name={'lowercabinetml'} label={'Mueble bajo'} unit={'ml'} />}

                        {/* PUERTA CORREDIZA */}
                        {spaces[progressCounter]?.name === 'clothes' && <InputInfoSpace handle={handleSpace} name={'slidingdoor'} label={'Puerta Corrediza'} unit={'ml'} />}

                        {/* ALACENA */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace handle={handleSpace} name={'cubboard'} label={'Alacena'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'clothes' && <InputInfoSpace handle={handleSpace} name={'cubboard'} label={'Alacena'} unit={'ml'} />}


                        {/* ISLA O BARRA */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace handle={handleSpace} name={'islandorbar'} label={'Isla o barra (opcional)'} unit={'ml'} />}

                        {/* MUEBLE BAÑO */}
                        {spaces[progressCounter]?.name === 'bathRoomWithShower' && <InputInfoSpace handle={handleSpace} name={'bathroomfurniture'} label={'Mueble baño'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'socialBathRoomWithoutShower' && <InputInfoSpace handle={handleSpace} name={'bathroomfurniture'} label={'Mueble baño'} unit={'ml'} />}


                        {/* DIVISION DUCHA */}
                        {spaces[progressCounter]?.name === 'bathRoomWithShower' && <InputInfoSpace handle={handleSpace} name={'showerdivision'} label={'Division ducha'} unit={'ml'} />}

                        {/* CLOSET */}
                        {spaces[progressCounter]?.name === 'bedRoom' && <InputInfoSpace handle={handleSpace} name={'closetml'} label={'Closet'} unit={'ml'} />}


                        {/* CIERLO RASO */}
                        {spaces[progressCounter]?.name === 'bathRoomWithShower' && <InputInfoSpace handle={handleSpace} name={'ceilingr'} label={'Cielo raso'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'bedRoom' && <InputInfoSpace handle={handleSpace} name={'ceilingr'} label={'Cielo raso'} unit={'ml'} />}

                        {/* MURO ENCHAPADO */}

                        {spaces[progressCounter]?.name === 'socialBathRoomWithoutShower' && <InputInfoSpace handle={handleSpace} name={'veneeredwall'} label={'Muro enchapado'} unit={'ml'} />}



                        {/* Escritorio */}
                        {spaces[progressCounter]?.name === 'study' && <InputInfoSpace handle={handleSpace} name={'deskml'} label={'Escritorio'} unit={'ml'} />}

                        {/* Mueble TV o biblioteca */}
                        {spaces[progressCounter]?.name === 'study' && <InputInfoSpace handle={handleSpace} name={'furnituretvlibrary'} label={'Mueble (tv o biblioteca)'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'diningRoom' && <InputInfoSpace handle={handleSpace} name={'furnituretvlibrary'} label={'Mueble (tv o biblioteca)'} unit={'ml'} />}

                        {/* REPISA */}
                        {spaces[progressCounter]?.name === 'study' && <InputInfoSpace handle={handleSpace} name={'shelf'} label={'Repisa'} unit={'ml'} />}

                    </div>
                </div>
                {comment
                    &&
                    <>
                        <label className="mx-2 font-roboto font-normal text-lg text-battleGray">Comentario</label>
                        <input name="commentuser" className='bg-white border border-platinum rounded-md w-full  flex flex-col justify-center items-center overflow-hidden h-20 p-4' onChange={handleSpace} />
                    </>
                }
                <AddTipologyButton setSpace={setSpace} space={space} singleSpace={spaces[progressCounter]} />
            </div>
        </>
    )
}
