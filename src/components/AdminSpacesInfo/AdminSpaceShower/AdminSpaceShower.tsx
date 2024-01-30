import { ChangeEvent, FC, useContext } from "react"
import { NewProjectContext } from "../../../context"
import add from '../../../assets/icons/add-tipology.png'
import { Spaces } from "../../../types/Spaces"
interface Props {
    space: Spaces
}
export const AdminSpaceShower: FC<Props> = ({ space }) => {
    const { setNewProject, newProject } = useContext(NewProjectContext)

    const handleClothes = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const updatedSpaces = newProject.spaces.map(spa => spa.name === space.name && spa.number === space.number ? { ...spa, [e.target.name]: e.target.value } : spa)
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

        const updatedSpaces = newProject.spaces.map(spa => spa.name === space.name && spa.number === space.number ? { ...spa, [e.target.name]: formData } : spa)
        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: updatedSpaces
            }
        })
    }

    return (
        <>
            <div className='flex justify-between'>
                <h3 className='font-roboto text-xl text-vivvi font-semibold'> Ducha {space.number} </h3>
                <button className='border border-vivvi text-vivvi text-sm rounded-2xl p-1'>
                    Añadir otra tipología
                </button>
            </div>

            <label className=" p-4 bg-white border border-platinum flex items-center" >
                <select name='tipology' onChange={handleClothes} defaultValue={newProject.spaces.filter(spa => spa.name === space.name)[0]?.tipology}>
                    <option>
                        1
                    </option>
                    <option>
                        2
                    </option>
                    <option>
                        3
                    </option>
                </select>
                Tipología existente
            </label>
            <label className=" p-2 bg-white border border-platinum flex justify-start items-center">
                <div>
                    <img src={add} alt='upload' className='w-10' />
                </div>
                <input type="file" name={"tipologyImage"} className="" placeholder='Cargar imagen de la tipología'  onChange={handleImage} />
                Cargar imagen de la tipología
            </label>
        </>
    )
}
