import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { NewProjectContext } from '../../../context'
import { Spaces } from '../../../types/Spaces'

interface Props {
    space: Spaces
}
export const AdminSpaceHall : FC<Props> = ({ space }) => {
    const { setNewProject, newProject } = useContext(NewProjectContext)
    const [tipologies, setTipologies] = useState<number[]>([])

    useEffect(() => {
        const tipologiesStorage = localStorage.getItem(`${space.name}${space.roomNumber}Tipologies`);

        if (tipologiesStorage) {
            setTipologies(JSON.parse(tipologiesStorage));
        } else {
            setTipologies([1])
        }
    }, [])

    const handleHall = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const newTipologies = space.tipologies.map((typo) => typo.id.toString() === e.target.id ? { ...typo, [e.target.name]: e.target.value } : typo)

        const updatedSpaces = newProject.spaces.map(spa => spa.name === space.name && spa.roomNumber === space.roomNumber ? { ...spa, newTipologies } : spa)
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
            <h3 className='font-roboto text-xl text-vivvi font-semibold'> Hall {space.roomNumber === 1 ? '' : space.roomNumber} </h3>
            {tipologies.map((tipology) => {
                return (
                    <div key={tipology} className='flex flex-col gap-2'>
                        <div>
                            <p className='font-medium'>Información tipología existente (obligatorio)</p>
                        </div>
                        <label className=" p-4 bg-white border border-platinum">
                            <input type="text" name={"area"} id={tipology.toString()} className="w-full" placeholder='Área (m2)' defaultValue={newProject.spaces.filter(spa => spa.name === space.name && spa.roomNumber === space.roomNumber)[0]?.tipologies.filter((typo) => typo.id === tipology)[0]?.area} onChange={handleHall} />
                        </label>
                        
                    </div>
                )
            })}

        </>
    )
}
