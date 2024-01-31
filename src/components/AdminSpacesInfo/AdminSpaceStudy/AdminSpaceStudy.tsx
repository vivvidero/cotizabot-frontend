import { ChangeEvent, FC, useContext } from 'react'
import { NewProjectContext } from '../../../context'
import { Spaces } from '../../../types/Spaces'

interface Props {
    space: Spaces
}
export const AdminSpaceStudy: FC<Props> = ({ space }) => {
    const { setNewProject, newProject } = useContext(NewProjectContext)

    const handleStudy = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const updatedSpaces = newProject.spaces.map(spa => spa.name === space.name && spa.number === space.number ? { ...spa, [e.target.name]: e.target.value } : spa)
        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: updatedSpaces
            }
        })
        localStorage.setItem('newProject', JSON.stringify({ ...newProject, spaces: updatedSpaces }));
    }

    return (
        <>
            <div className='flex justify-between'>
                <h3 className='font-roboto text-xl text-vivvi font-semibold'> Estudio {space.number} </h3>
                <button className='border border-vivvi text-vivvi text-sm rounded-2xl p-1'>
                    Añadir otra tipología
                </button>
            </div>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"area"} className="w-full" placeholder='Área' defaultValue={newProject.spaces.filter(spa => spa.name === space.name && spa.number === space.number)[0]?.area} onChange={handleStudy} />
            </label>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"mlDesktop"} className="w-full" placeholder='ML Escritorio' defaultValue={newProject.spaces.filter(spa => spa.name === space.name && spa.number === space.number)[0]?.mlDesktop} onChange={handleStudy} />
            </label>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"mlFurniture"} className="w-full" placeholder='ML - mueble (tv o biblioteca)' defaultValue={newProject.spaces.filter(spa => spa.name === space.name && spa.number === space.number)[0]?.mlFurniture} onChange={handleStudy} />
            </label>
        </>
    )
}
