import { ChangeEvent, useContext } from 'react'
import { ApusContext } from '../../../context/ApusContext'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { References } from '../../../types/apus/ApuInfo';


export const EditReferenceForm = ({ formNumber }: { formNumber: number }) => {

    const { apuFormData, setItemImages, itemImages, setInstalledItemImages, installedItemImages, setEditApu, editApu } = useContext(ApusContext)

    const handleNewApu = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        let referencesUpdated: References[];
        const existingReference = editApu.references.find(ref => ref.id === formNumber + 1);

        if (!existingReference) {
            referencesUpdated = [...editApu.references, {
                id: formNumber + 1,
                [e.target.name]: e.target.value
            }];
        } else {
            referencesUpdated = editApu.references.map((reference) => {
                if (reference.id === formNumber + 1) {
                    return {
                        ...reference,
                        [e.target.name]: e.target.value
                    }
                } else {
                    return reference;
                }
            });
        }
        setEditApu((prevState) => {
            return {
                ...prevState,
                references: referencesUpdated
            }
        })
    }

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if (!file) return

        const fileArray = Array.from(file)

        apuFormData.append(`${e.target.name}`, fileArray[0]);

        if (fileArray) {
            // Leer el contenido del archivo y mostrar una vista previa de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                if (e.target.name === `itemImage${formNumber + 1}`) {
                    const updatedImages = itemImages.concat({
                        id: formNumber + 1,
                        url: reader.result as string,
                        name: fileArray[0].name
                    })
                    setItemImages(updatedImages)
                } else {
                    const updatedImages = installedItemImages.concat({
                        id: formNumber + 1,
                        url: reader.result as string,
                        name: fileArray[0].name
                    })
                    setInstalledItemImages(updatedImages)
                }
            };
            reader.readAsDataURL(fileArray[0]);
        }
    }

    const handleMultipleImages = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if (!file) return

        const fileArray = Array.from(file)

        fileArray.forEach((image, index) => {
            apuFormData.append(`${e.target.name}${index}`, image);
        })

        if (fileArray) {
            // Iterar sobre cada archivo en fileArray
            fileArray.forEach((file) => {
                // Leer el contenido del archivo y mostrar una vista previa de la imagen
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Agregar la imagen al estado installedItemImages
                    setInstalledItemImages(prevImages => {
                        // Crear una nueva copia del array de imágenes
                        const updatedImages = [...prevImages];
                        // Agregar la imagen actual al array
                        updatedImages.push({
                            id: formNumber + 1,
                            url: reader.result as string,
                            name: file.name
                        });
                        return updatedImages;
                    });
                };
                // Leer el archivo actual como URL de datos
                reader.readAsDataURL(file);
            });
        }
    }


    return (
        <>
            <h3 className='mt-8 text-xl'> Referencia {formNumber + 1} </h3>
            <form className="grid grid-cols-3 gap-6 p-8 w-full" >
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Código de la referencia</label>
                    <input className='py-6 px-5 border ' type='text' defaultValue={editApu.references[formNumber]?.code} placeholder={"Código de la referencia"} name={"code"} onChange={handleNewApu} required />
                </div>
                <div className="flex flex-col gap-2">

                    <label htmlFor="name">Nombre</label>
                    <input className='py-6 px-5 border ' type='text' defaultValue={editApu.references[formNumber]?.name} placeholder={"Nombre de la referencia"} name={"name"} onChange={handleNewApu} required />
                </div>
                <div className="flex flex-col gap-2">

                    <label htmlFor="name">Color</label>
                    <input className='py-6 px-5 border ' type='text' defaultValue={editApu.references[formNumber]?.color} placeholder={"Color de la referencia"} name={"color"} onChange={handleNewApu} required />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Precio Tope</label>
                    <input className='py-6 px-5 border ' type='number' defaultValue={editApu.references[formNumber]?.priceCeiling} placeholder={"Precio Tope de la referencia"} name={"priceCeiling"} onChange={handleNewApu} required />
                </div>

                <div></div>
                <div></div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor={`itemImage${formNumber + 1}`} className="cursor-pointer">Imagen del item
                        <div className='  flex flex-col items-center overflow-hidden bg-white border h-52 border-platinum rounded-md justify-center '>
                            {itemImages.filter((image) => image.id === editApu.references[formNumber].id)[0]?.url
                                ?
                                <img src={itemImages.filter((image) => image.id === editApu.references[formNumber].id)[0]?.url} className={`object-cover `} />
                                :
                                editApu.references[formNumber]?.itemImage
                                    ?
                                    <img src={editApu.references[formNumber]?.itemImage} className={`object-cover `} />
                                    :
                                    <>
                                        <CloudUploadIcon sx={{ width: '80px', height: '80px', color: '#264B44' }} />
                                        <p className='flex flex-col items-center cursor-pointer'>
                                            Cargar imagen
                                        </p>
                                    </>
                            }
                            <input id={`itemImage${formNumber + 1}`} name={`itemImage${formNumber + 1}`} type='file' onChange={handleImage} className='hidden' />
                        </div>
                    </label>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor={`installedItemImage${formNumber + 1}`} className="cursor-pointer">Imagen del item instalado
                        <div className='  flex flex-col items-center overflow-hidden bg-white border h-52 border-platinum rounded-md justify-center '>
                            {installedItemImages.filter((image) => image.id === editApu.references[formNumber].id)[0]?.url
                                ?
                                <img src={installedItemImages.filter((image) => image.id === editApu.references[formNumber].id)[0]?.url} className={`object-cover `} />
                                :
                                editApu.references[formNumber]?.installedItemImage1
                                    ?
                                    <img src={editApu.references[formNumber]?.installedItemImage1} className={`object-cover `} />
                                    :
                                    <>
                                        <CloudUploadIcon sx={{ width: '80px', height: '80px', color: '#264B44' }} />
                                        <p className='flex flex-col items-center cursor-pointer'>
                                            Cargar imagen
                                        </p>
                                    </>
                            }
                            <input id={`installedItemImage${formNumber + 1}`} name={`installedItemImage${formNumber + 1}`} type='file' multiple max={3} onChange={handleMultipleImages} className='hidden'/>
                        </div>
                    </label>
                </div>
                <div className='grid grid-rows-2 items-end'>
                    {
                        installedItemImages.filter((image) => image.id === editApu.references[formNumber].id)[1]?.url
                            ?
                            <div className='border border-platinum w-1/2 overflow-hidden rounded-md'>
                                <img src={installedItemImages.filter((image) => image.id === editApu.references[formNumber].id)[1]?.url} className={`object-cover w-full h-24`} />
                            </div>
                            :
                            editApu.references[formNumber]?.installedItemImage2
                                ?
                                <div className='border border-platinum w-1/2 overflow-hidden rounded-md'>
                                    <img src={editApu.references[formNumber]?.installedItemImage2} className={`object-cover w-full h-24`} />
                                </div>
                                :
                                null
                    }
                    {
                        installedItemImages.filter((image) => image.id === editApu.references[formNumber].id)[2]?.url
                            ?
                            <div className='border border-platinum w-1/2 overflow-hidden rounded-md'>
                                <img src={installedItemImages.filter((image) => image.id === editApu.references[formNumber].id)[2]?.url} className={`object-cover w-full h-24`} />
                            </div>
                            :
                            editApu.references[formNumber]?.installedItemImage3
                                ?
                                <div className='border border-platinum w-1/2 overflow-hidden rounded-md'>
                                    <img src={editApu.references[formNumber]?.installedItemImage3} className={`object-cover w-full h-24`} />
                                </div>
                                :
                                null
                    }
                </div>
            </form>
        </>

    )
}
