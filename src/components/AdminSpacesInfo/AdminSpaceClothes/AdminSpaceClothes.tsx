import { ChangeEvent, useContext } from "react"
import { NewProjectContext } from "../../../context"
import add from '../../../assets/icons/add-tipology.png'

export const AdminSpaceClothes = () => {
    const { setNewProject } = useContext(NewProjectContext)

    const handleClothes = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: {
                    ...prevState.spaces,
                    clothes: {
                        ...prevState.spaces.clothes,
                        features: {
                            ...prevState.spaces.clothes.features,
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
                <h3 className='font-roboto text-xl text-vivvi font-semibold'> Ropas </h3>
                <button className='border border-vivvi text-vivvi text-sm rounded-2xl p-1'>
                    Añadir otra tipología
                </button>
            </div>
            
            <label className=" p-4 bg-white border border-platinum flex items-center" >
                <select name='tipology' onChange={handleClothes}>
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
                <input type="file" name={"tipologyImage"} className="" placeholder='Cargar imagen de la tipología' onChange={handleClothes} />
                Cargar imagen de la tipología
            </label>
        </>
    )
}
