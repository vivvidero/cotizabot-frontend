import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect } from "react"
import { SingleSpace, Spaces } from "../../types/Spaces"
import { translateSpace } from "../../helpers/translateSpace";
import addTipology from '../../assets/icons/add-tipology.png'
import addComment from '../../assets/icons/add-comment.png'
import { InputInfoSpace, SelectInfoSpace } from "..";
import { AddTipologyButton } from "../ui/AddTipologyButton/AddTipologyButton";

interface ImagePreview {
    url: string,
    name: string,
}

interface Props {
    spaces: Spaces[],
    progressCounter: number
    space: SingleSpace
    setSpace: Dispatch<SetStateAction<SingleSpace>>
    setFormDataSpaceTypo: Dispatch<SetStateAction<FormData>>
    formDataSpaceTypo: FormData
    setImagePreviewactualstatus: Dispatch<SetStateAction<ImagePreview>>
    setImagePreview3D: Dispatch<SetStateAction<ImagePreview>>
    imagePreview3D: ImagePreview
    imagePreviewactualstatus: ImagePreview,
    comment: boolean,
    setComment: Dispatch<SetStateAction<boolean>>
}

export const AdminSpacesInfo: FC<Props> = ({ spaces, progressCounter, space, setSpace, formDataSpaceTypo, setFormDataSpaceTypo, setImagePreviewactualstatus, setImagePreview3D, imagePreview3D, imagePreviewactualstatus, comment, setComment }) => {


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
        setSpace({
            spacetype: spaces[progressCounter]?.name,
            roomnumber: spaces[progressCounter]?.roomnumber,
            spaceid: spaces[progressCounter]?.spaceid
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
                            spaces[progressCounter]?.name === 'kitchen'
                                ?
                                <SelectInfoSpace handle={handleSpace} options={["1", "2"]} value={space?.spacetypology} />
                                :
                                spaces[progressCounter]?.name === 'clothes'
                                    ?
                                    <SelectInfoSpace handle={handleSpace} options={["1", "2"]} value={space?.spacetypology} />
                                    :
                                    ''
                        }

                        {/* AREA */}
                        <InputInfoSpace value={space.area} handle={handleSpace} name={'area'} label={'Área'} unit={'m2'} />

                        {/* DEMOLICIONES */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace value={space?.demolitions} handle={handleSpace} name={'demolitions'} label={'Demoliciones (opcional)'} unit={'m2'} />}

                        {/* MUROS */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace value={space?.walls} handle={handleSpace} name={'walls'} label={'Muros (opcional)'} unit={'m2'} />}

                        {/* MUEBLE BAJO */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace value={space?.lowercabinetml} handle={handleSpace} name={'lowercabinetml'} label={'Mueble bajo'} unit={'ml'} />}

                        {/* PUERTA CORREDIZA */}
                        {spaces[progressCounter]?.name === 'clothes' && <InputInfoSpace value={space?.slidingdoor} handle={handleSpace} name={'slidingdoor'} label={'Puerta Corrediza'} unit={'ml'} />}

                        {/* ALACENA */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace value={space.cubboard} handle={handleSpace} name={'cubboard'} label={'Alacena'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'clothes' && <InputInfoSpace value={space.cubboard} handle={handleSpace} name={'cubboard'} label={'Alacena'} unit={'ml'} />}

                        {/* ISLA O BARRA */}
                        {spaces[progressCounter]?.name === 'kitchen' && <InputInfoSpace value={space.islandorbar} handle={handleSpace} name={'islandorbar'} label={'Isla o barra (opcional)'} unit={'ml'} />}

                        {/* MUEBLE BAÑO */}
                        {spaces[progressCounter]?.name === 'bathRoomWithShower' && <InputInfoSpace value={space.bathroomfurniture} handle={handleSpace} name={'bathroomfurniture'} label={'Mueble baño'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'socialBathRoomWithoutShower' && <InputInfoSpace value={space.bathroomfurniture} handle={handleSpace} name={'bathroomfurniture'} label={'Mueble baño'} unit={'ml'} />}


                        {/* DIVISION DUCHA */}
                        {spaces[progressCounter]?.name === 'bathRoomWithShower' && <InputInfoSpace value={space.showerdivision} handle={handleSpace} name={'showerdivision'} label={'Division ducha'} unit={'ml'} />}

                        {/* CLOSET */}
                        {spaces[progressCounter]?.name === 'bedRoom' && <InputInfoSpace value={space.closetml} handle={handleSpace} name={'closetml'} label={'Closet'} unit={'ml'} />}


                        {/* CIERLO RASO */}
                        {spaces[progressCounter]?.name === 'bathRoomWithShower' && <InputInfoSpace value={space.ceilingr} handle={handleSpace} name={'ceilingr'} label={'Cielo raso'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'bedRoom' && <InputInfoSpace value={space.ceilingr} handle={handleSpace} name={'ceilingr'} label={'Cielo raso'} unit={'ml'} />}

                        {/* MURO ENCHAPADO */}

                        {spaces[progressCounter]?.name === 'socialBathRoomWithoutShower' && <InputInfoSpace value={space.veneeredwall} handle={handleSpace} name={'veneeredwall'} label={'Muro enchapado'} unit={'ml'} />}



                        {/* Escritorio */}
                        {spaces[progressCounter]?.name === 'study' && <InputInfoSpace value={space.deskml} handle={handleSpace} name={'deskml'} label={'Escritorio'} unit={'ml'} />}

                        {/* Mueble TV o biblioteca */}
                        {spaces[progressCounter]?.name === 'study' && <InputInfoSpace value={space.furnituretvlibrary} handle={handleSpace} name={'furnituretvlibrary'} label={'Mueble (tv o biblioteca)'} unit={'ml'} />}
                        {spaces[progressCounter]?.name === 'diningRoom' && <InputInfoSpace value={space.furnituretvlibrary} handle={handleSpace} name={'furnituretvlibrary'} label={'Mueble (tv o biblioteca)'} unit={'ml'} />}

                        {/* REPISA */}
                        {spaces[progressCounter]?.name === 'study' && <InputInfoSpace value={space.shelf} handle={handleSpace} name={'shelf'} label={'Repisa'} unit={'ml'} />}

                    </div>
                </div>
                {comment
                    &&
                    <>
                        <label className="mx-2 font-roboto font-normal text-lg text-battleGray">Comentario</label>
                        <input name="commentuser" value={space?.commentuser} className='bg-white border border-platinum rounded-md w-full  flex flex-col justify-center items-center overflow-hidden h-20 p-4' onChange={handleSpace} />
                    </>
                }
                {
                    spaces[progressCounter]?.name === 'kitchen'
                    &&
                    <AddTipologyButton setComment={setComment} setSpace={setSpace} space={space} singleSpace={spaces[progressCounter]} setFormDataSpaceTypo={setFormDataSpaceTypo} formDataSpaceTypo={formDataSpaceTypo} setImagePreview3D={setImagePreview3D} setImagePreviewactualstatus={setImagePreviewactualstatus} />
                }
                {
                    spaces[progressCounter]?.name === 'clothes'
                    &&
                    <AddTipologyButton setComment={setComment} setSpace={setSpace} space={space} singleSpace={spaces[progressCounter]} setFormDataSpaceTypo={setFormDataSpaceTypo} formDataSpaceTypo={formDataSpaceTypo} setImagePreview3D={setImagePreview3D} setImagePreviewactualstatus={setImagePreviewactualstatus} />
                }
            </div>
        </>
    )
}
