import { ChangeEvent, FC, useContext } from 'react'
import { NewProjectContext } from '../../../context'


export const AdminSpaceTerrace: FC = () => {
    const { setNewProject } = useContext(NewProjectContext)

    const handleTerrace = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: {
                    ...prevState.spaces,
                    terrace: {
                        ...prevState.spaces.terrace,
                        features: {
                            ...prevState.spaces.terrace.features,
                            [e.target.name]: e.target.value
                        }
                    }
                }
            }
        })
    }

    return (
        <>
            <div className='flex justify-between'>
                <h3 className='font-roboto text-xl text-vivvi font-semibold'> Terraza/Balcón </h3>
                <button className='border border-vivvi text-vivvi text-sm rounded-2xl p-1'>
                    Añadir otra tipología
                </button>
            </div>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"area"} className="w-full" placeholder='Área' onChange={handleTerrace} />
            </label>
            
        </>
    )
}
