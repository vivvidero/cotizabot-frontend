import { ChangeEvent, FC, useContext } from 'react'
import add from '../../../assets/icons/add-tipology.png'
import { NewProjectContext } from '../../../context'


export const AdminSpaceKitchen: FC = () => {

    const { setNewProject } = useContext(NewProjectContext)

    const handleKitchen = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: {
                    ...prevState.spaces,
                    kitchen: {
                        ...prevState.spaces.kitchen,
                        features: {
                            ...prevState.spaces.kitchen.features,
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
                <h3 className='font-roboto text-xl text-vivvi font-semibold'> Cocina </h3>
                <button className='border border-vivvi text-vivvi text-sm rounded-2xl p-1'>
                    Añadir otra tipología
                </button>
            </div>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"area"} className="w-full" placeholder='Área' onChange={handleKitchen} />
            </label>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"mlLowCabinet"} className="w-full" placeholder='ML Mueble bajo' onChange={handleKitchen} />
            </label>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"mlHighCabinet"} className="w-full" placeholder='ML Mueble alto' onChange={handleKitchen} />
            </label>
            <label className=" p-4 bg-white border border-platinum">
                <input type="text" name={"mlIslandFurniture"} className="w-full" placeholder='ML Mueble isla' onChange={handleKitchen} />
            </label>
            <label className=" p-4 bg-white border border-platinum flex items-center" >
                <select name='tipology' onChange={handleKitchen}>
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
                <input type="file" name={"tipologyImage"} className="" placeholder='Cargar imagen de la tipología' onChange={handleKitchen} />
                Cargar imagen de la tipología
            </label>
        </>
    )
}
