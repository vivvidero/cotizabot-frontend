import { ChangeEvent, FC, useContext, useEffect, useState } from "react"
import { NewProjectContext } from "../../../context"
import addTipology from '../../../assets/icons/imagePlaceholder.png'
import add from '../../../assets/icons/add-tipology.png'
import { Spaces } from "../../../types/Spaces"
import { AddTipologyButton } from "../../ui/AddTipologyButton/AddTipologyButton"
interface Props {
    space: Spaces
}

interface ImagePreview {
    id: number,
    url: string
}

export const AdminSpaceClothes: FC<Props> = ({ space }) => {
    const { setNewProject, newProject } = useContext(NewProjectContext)
    const [imagePreview, setImagePreview] = useState<ImagePreview[]>([]);
    const [tipologies, setTipologies] = useState<number[]>([1])

    useEffect(() => {
        const tipologiesStorage = localStorage.getItem(`${space.name}${space.roomNumber}Tipologies`);

        if (tipologiesStorage) {
            setTipologies(JSON.parse(tipologiesStorage));
        } else {
            setTipologies([1])
        }
    }, [])


    const handleClothes = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const newTipologies = space.tipologies.map((typo) => typo.id.toString() === e.target.id ? { ...typo, [e.target.name]: e.target.value } : typo)

        const updatedSpaces = newProject.spaces.map(spa => spa.name === space.name && spa.roomNumber === space.roomNumber ? { ...spa, tipologies: newTipologies } : spa)
        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: updatedSpaces
            }
        })
        localStorage.setItem('newProject', JSON.stringify({ ...newProject, spaces: updatedSpaces }));
    }

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('image', file);

        const newTipologies = space.tipologies.map((typo) => typo.id.toString() === e.target.id ? { ...typo, [e.target.name]: formData } : typo)


        const updatedSpaces = newProject.spaces.map(spa => spa.name === space.name && spa.roomNumber === space.roomNumber ? { ...spa, tipologies: newTipologies } : spa)
        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: updatedSpaces
            }
        })

        localStorage.setItem('newProject', JSON.stringify({ ...newProject, spaces: updatedSpaces }));

        if (file) {
            // Leer el contenido del archivo y mostrar una vista previa de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview((prevState) => {
                    return ([
                        ...prevState,
                        { id: parseInt(e.target.id), url: reader.result as string }]
                    )
                })
            };
            reader.readAsDataURL(file);
        }
    }


    return (
        <>
            <h3 className='font-roboto text-xl text-vivvi font-semibold mb-4'> Ropas {space.roomNumber === 1 ? '' : space.roomNumber} </h3>

            {tipologies.map((tipology) => {
                return (
                    <div key={tipology}>
                        <div>
                            <p className='font-medium'>Información tipología existente (obligatorio)</p>
                        </div>
                        <div className='flex gap-6 mt-4'>
                            <div className='bg-platinum rounded-md flex flex-col justify-center items-center overflow-hidden w-4/12 h-52'>
                                <div className='flex flex-col justify-center items-center overflow-hidden p-4'>
                                    <img src={imagePreview.some((image) => image.id === tipology) ? imagePreview.filter((image) => image.id === tipology)[0].url : addTipology} alt={'Tipologia elegida'} className=' object-contain' />
                                    {!imagePreview.some((image) => image.id === tipology) && <p className='text-center'>No has seleccionado
                                        tipología</p>}

                                </div>
                            </div>
                            <div className='w-8/12 flex flex-col gap-2'>
                                <label className=" p-2 bg-white border border-platinum flex items-center" >
                                    <select name='tipology' id={tipology.toString()} onChange={handleClothes} defaultValue={newProject.spaces.filter(spa => spa.name === space.name)[0]?.tipologies.filter((typo) => typo.id === tipology)[0]?.tipology}>
                                        <option>
                                            Tipologia 1
                                        </option>
                                        <option>
                                            Tipologia 2
                                        </option>
                                    </select>
                                </label>
                                <label className=" p-2 bg-white border border-platinum">
                                    <input type="text" name={"area"} id={tipology.toString()} className="w-full" placeholder='Área (m2)' defaultValue={newProject.spaces.filter(spa => spa.name === space.name)[0]?.tipologies.filter((typo) => typo.id === tipology)[0]?.area} onChange={handleClothes} />
                                </label>

                                <label className=" p-4 bg-white border border-platinum">
                                    <div className='flex justify-center items-center gap-3'>
                                        <img src={add} alt='añadir imagen' className='w-12' />
                                        Cargar imagen de la tipología

                                    </div>
                                    <input type='file' name='tipologyImage' id={tipology.toString()} onChange={handleImage} />
                                </label>

                            </div>
                        </div>
                    </div>
                )
            })}

            <AddTipologyButton space={space} setTipologies={setTipologies} tipologies={tipologies} />

        </>
    )
}
