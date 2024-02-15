import { ChangeEvent, FC, useEffect, useState } from "react"
import { SingleSpace, Spaces } from "../../types/Spaces"
import { translateSpace } from "../../helpers/translateSpace";
import addTipology from '../../assets/icons/add-tipology.png'
import addComment from '../../assets/icons/add-comment.png'
import { InputInfoSpace, SelectInfoSpace } from "..";
import { AddTipologyButton } from "../ui/AddTipologyButton/AddTipologyButton";

interface Props {
    spaces: Spaces[],
    progressCounter: number
}

interface ImagePreview {
    url: string,
    name: string
}

export const AdminSpacesInfo: FC<Props> = ({ spaces, progressCounter }) => {

    const [imagePreview3D, setImagePreview3D] = useState<ImagePreview>();
    const [imagePreviewActualStatus, setImagePreviewActualStatus] = useState<ImagePreview>();
    const [space, setSpace] = useState<SingleSpace>({
        space: spaces[progressCounter]?.name
    })
    const [comment, setComment] = useState(false)

    useEffect(() => {
        setSpace({
            space: spaces[progressCounter]?.name
        })
    }, [progressCounter, spaces])


    const handleSpace = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

        setSpace((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];

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
                if (e.target.name === 'image3D') {
                    setImagePreview3D({
                        url: reader.result as string,
                        name: file.name
                    })
                } else {
                    setImagePreviewActualStatus({
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
            <h3 className='font-roboto text-xl text-vivvi font-semibold mb-4'> {translateSpace(spaces[progressCounter]?.name)} {spaces[progressCounter]?.roomNumber > 1 && spaces[progressCounter]?.roomNumber} </h3>
            <div>
                <div>
                    <p className='font-medium'>Información tipología existente (obligatorio)</p>
                </div>
                <div className='flex gap-6 mt-4'>
                    <div className="flex flex-col gap-4 w-4/12">
                        <div className='bg-white border border-platinum rounded-md flex flex-col justify-center items-center overflow-hidden h-52'>
                            <div className='p-2  flex flex-col items-center overflow-hidden'>
                                <label htmlFor={`${spaces[progressCounter]?.name}Image3D`} className='flex flex-col items-center cursor-pointer'>
                                    <img src={imagePreview3D?.url ? imagePreview3D.url : addTipology} className={` ${imagePreview3D ? 'w-full' : 'w-1/2'}`} />
                                    {space?.image3D
                                        ?
                                        <p>{space?.image3D?.name}</p>
                                        :
                                        'Cargar imagen 3D'}
                                </label>
                                <input id={`${spaces[progressCounter]?.name}Image3D`} name={'image3D'} type='file' onChange={handleImage} className='hidden' />
                                <p> {imagePreview3D?.name} </p>
                            </div>
                        </div>
                        <div className='bg-white border border-platinum rounded-md flex flex-col justify-center items-center overflow-hidden'>
                            <div className='p-2 flex flex-col items-center overflow-hidden'>
                                <label htmlFor={`${spaces[progressCounter]?.name}ActualStatus`} className='flex flex-col items-center cursor-pointer'>
                                    <img src={imagePreviewActualStatus?.url ? imagePreviewActualStatus.url : addTipology} className={` ${imagePreviewActualStatus ? 'w-full' : 'w-1/3'}`} />
                                    {space?.actualStatus
                                        ?
                                        <p>{space?.actualStatus?.name}</p>
                                        :
                                        'Cargar fotos estado actual'}
                                </label>
                                <input id={`${spaces[progressCounter]?.name}ActualStatus`} name={'actualStatus'} type='file' onChange={handleImage} className='hidden' />
                                <p> {imagePreviewActualStatus?.name} </p>
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
                                <SelectInfoSpace handle={handleSpace} options={["Cocina en Barra", "Cocina en barra"]} />
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
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace handle={handleSpace} name={'lowCabinet'} label={'Mueble bajo'} unit={'ml'} />}

                        {/* PUERTA CORREDIZA */}
                        {spaces[progressCounter]?.name === 'clothes' && <InputInfoSpace handle={handleSpace} name={'slidingDoor'} label={'Puerta Corrediza'} unit={'ml'} />}

                        {/* ALACENA */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace handle={handleSpace} name={'cubBoard'} label={'Alacena'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'clothes' && <InputInfoSpace handle={handleSpace} name={'cubBoard'} label={'Alacena'} unit={'ml'} />}


                        {/* ISLA O BARRA */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace handle={handleSpace} name={'islandOrBar'} label={'Isla o barra (opcional)'} unit={'ml'} />}

                        {/* MUEBLE BAÑO */}
                        {spaces[progressCounter]?.name === 'bathRoomWithShower' && <InputInfoSpace handle={handleSpace} name={'bathroomFurniture'} label={'Mueble baño'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'socialBathRoomWithoutShower' && <InputInfoSpace handle={handleSpace} name={'bathroomFurniture'} label={'Mueble baño'} unit={'ml'} />}


                        {/* DIVISION DUCHA */}
                        {spaces[progressCounter]?.name === 'bathRoomWithShower' && <InputInfoSpace handle={handleSpace} name={'showerDivision'} label={'Division ducha'} unit={'ml'} />}

                        {/* CLOSET */}
                        {spaces[progressCounter]?.name === 'bedRoom' && <InputInfoSpace handle={handleSpace} name={'closet'} label={'Closet'} unit={'ml'} />}


                        {/* CIERLO RASO */}
                        {spaces[progressCounter]?.name === 'bathRoomWithShower' && <InputInfoSpace handle={handleSpace} name={'ceiling'} label={'Cielo raso'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'bedRoom' && <InputInfoSpace handle={handleSpace} name={'ceiling'} label={'Cielo raso'} unit={'ml'} />}

                        {/* MURO ENCHAPADO */}

                        {spaces[progressCounter]?.name === 'socialBathRoomWithoutShower' && <InputInfoSpace handle={handleSpace} name={'veneeredWall'} label={'Muro enchapado'} unit={'ml'} />}



                        {/* Escritorio */}
                        {spaces[progressCounter]?.name === 'study' && <InputInfoSpace handle={handleSpace} name={'desktop'} label={'Escritorio'} unit={'ml'} />}

                        {/* Mueble TV o biblioteca */}
                        {spaces[progressCounter]?.name === 'study' && <InputInfoSpace handle={handleSpace} name={'furnitureTVLibrary'} label={'Mueble (tv o biblioteca)'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'diningRoom' && <InputInfoSpace handle={handleSpace} name={'furnitureTVLibrary'} label={'Mueble (tv o biblioteca)'} unit={'ml'} />}

                        {/* REPISA */}
                        {spaces[progressCounter]?.name === 'study' && <InputInfoSpace handle={handleSpace} name={'shelf'} label={'Repisa'} unit={'ml'} />}


                    </div>
                </div>
                {comment
                    &&
                    <>
                        <label className="mx-2 font-roboto font-normal text-lg text-battleGray">Comentario</label>
                        <input name="comment" className='bg-white border border-platinum rounded-md w-full  flex flex-col justify-center items-center overflow-hidden h-20 p-4' onChange={handleSpace} />
                    </>
                }
                <AddTipologyButton setSpace={setSpace} singleSpace={spaces[progressCounter]} />
            </div>
        </>
    )
}
