import { ChangeEvent, FC, useContext } from 'react'
import { NewProjectContext } from '../../../context'
import { Spaces } from '../../../types/Spaces'

interface Props {
    space: Spaces
}
export const AdminSpaceBedRoom: FC<Props> = ({ space }) => {
    const { setNewProject, newProject } = useContext(NewProjectContext)

    const handleBedRoom = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

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
                <h3 className='font-roboto text-xl text-vivvi font-semibold'> Habitación {space.number} </h3>
                <button className='border border-vivvi text-vivvi text-sm rounded-2xl p-1'>
                    Añadir otra tipología
                </button>
            </div>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"area"} className="w-full" placeholder='Área' defaultValue={newProject.spaces.filter(spa => spa.name === space.name)[0]?.area} onChange={handleBedRoom} />
            </label>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"mlCloset"} className="w-full" placeholder='ML Closet' defaultValue={newProject.spaces.filter(spa => spa.name === space.name)[0]?.mlCloset} onChange={handleBedRoom} />
            </label>
        </>
    )
}
