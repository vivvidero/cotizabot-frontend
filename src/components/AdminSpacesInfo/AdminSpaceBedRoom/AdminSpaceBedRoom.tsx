import { ChangeEvent, FC, useContext } from 'react'
import { NewProjectContext } from '../../../context'

interface Props {
    bedNumber: number
}
export const AdminSpaceBedRoom: FC<Props> = ({ bedNumber }) => {
    const { setNewProject } = useContext(NewProjectContext)

    const handleBedRoom = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: {
                    ...prevState.spaces,
                    bedRoom: {
                        ...prevState.spaces.bedRoom,
                        features: {
                            ...prevState.spaces.bedRoom.features,
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
                <h3 className='font-roboto text-xl text-vivvi font-semibold'> Habitación {bedNumber} </h3>
                <button className='border border-vivvi text-vivvi text-sm rounded-2xl p-1'>
                    Añadir otra tipología
                </button>
            </div>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"area"} className="w-full" placeholder='Área' onChange={handleBedRoom} />
            </label>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"mlCloset"} className="w-full" placeholder='ML Closet' onChange={handleBedRoom} />
            </label>
        </>
    )
}
