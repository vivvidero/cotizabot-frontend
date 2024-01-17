import { ChangeEvent, FC, useContext } from "react"
import { NewProjectContext } from "../../../context"
import add from '../../../assets/icons/add-tipology.png'

interface Props {
    bathNumber: number
}

export const AdminSpaceBathRoom: FC<Props> = ({bathNumber}) => {
    const { setNewProject } = useContext(NewProjectContext)

    const handleBathRoom = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: {
                    ...prevState.spaces,
                    bathRoom: {
                        ...prevState.spaces.bathRoom,
                        features: {
                            ...prevState.spaces.bathRoom.features,
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
                <h3 className='font-roboto text-xl text-vivvi font-semibold'> Baño {bathNumber} </h3>
                <button className='border border-vivvi text-vivvi text-sm rounded-2xl p-1'>
                    Añadir otra tipología
                </button>
            </div>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"area"} className="w-full" placeholder='Área' onChange={handleBathRoom} />
            </label>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"mlShower"} className="w-full" placeholder='ML Ducha' onChange={handleBathRoom} />
            </label>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"mlBathRoomFurniture"} className="w-full" placeholder='ML Mueble baño' onChange={handleBathRoom} />
            </label>
            <label className=" p-4 bg-white border border-platinum flex items-center" >
                <select name='tipology' onChange={handleBathRoom}>
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
                <input type="file" name={"tipologyImage"} className="" placeholder='Cargar imagen de la tipología' onChange={handleBathRoom} />
                Cargar imagen de la tipología
            </label>
        </>
    )
}
