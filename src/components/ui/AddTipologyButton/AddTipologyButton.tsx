import { Dispatch, FC, SetStateAction, useContext } from 'react'
import plus from '../../../assets/icons/Plus.png'
import { NewProjectContext } from '../../../context'
import { Spaces } from '../../../types/Spaces'

interface Props{
    tipologies: number[],
    setTipologies: Dispatch<SetStateAction<number[]>>,
    space: Spaces
}

export const AddTipologyButton: FC<Props> = ({tipologies, setTipologies, space}) => {

    const {newProject, setNewProject} = useContext(NewProjectContext)

    const addTipologies = () => {


        const lastTipology = tipologies[tipologies.length - 1]
        setTipologies((prevState) => [...prevState, lastTipology + 1])
        localStorage.setItem(`${space.name}${space.roomNumber}Tipologies`, JSON.stringify([...tipologies, lastTipology + 1]))
        const updatedTipologies = newProject.spaces.map(spa => spa.name === space.name && spa.roomNumber === space.roomNumber ? { ...spa, tipologies: [...spa.tipologies, { id: lastTipology + 1 }] } : spa)
        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: updatedTipologies
            }
        })
    }

    return (
        <div className='font-medium   '>
            <h3 className='mb-4'>Información tipologías posibles (opcional)</h3>
            <div className='bg-white p-2 flex gap-4 items-center cursor-pointer  hover:bg-slate-100 transition-all' onClick={addTipologies}>
                <div className='bg-platinum py-2 px-4 rounded-md'>
                    <img src={plus} alt='plus' />
                </div>
                <p> Agregar nueva tipología</p>
            </div>
        </div>
    )
}
