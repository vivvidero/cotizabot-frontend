import { ChangeEvent, FC, useContext } from 'react'
import { NewProjectContext } from '../../../context'

interface Props {
    studyNumber: number
}
export const AdminSpaceStudy: FC<Props> = ({ studyNumber }) => {
    const { setNewProject } = useContext(NewProjectContext)

    const handleStudy = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: {
                    ...prevState.spaces,
                    study: {
                        ...prevState.spaces.study,
                        features: {
                            ...prevState.spaces.study.features,
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
                <h3 className='font-roboto text-xl text-vivvi font-semibold'> Estudio {studyNumber} </h3>
                <button className='border border-vivvi text-vivvi text-sm rounded-2xl p-1'>
                    Añadir otra tipología
                </button>
            </div>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"area"} className="w-full" placeholder='Área' onChange={handleStudy} />
            </label>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"mlDesktop"} className="w-full" placeholder='ML Escritorio' onChange={handleStudy} />
            </label>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"mlFurniture"} className="w-full" placeholder='ML - mueble (tv o biblioteca)' onChange={handleStudy} />
            </label>
        </>
    )
}
