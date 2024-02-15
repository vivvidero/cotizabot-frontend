import { Dispatch, FC, SetStateAction, useContext } from 'react'
import plus from '../../../assets/icons/Plus.png'
import { SingleSpace, Spaces } from '../../../types/Spaces'
import { LoadingContext } from '../../../context/LoadingContext'

interface Props {
    setSpace: Dispatch<SetStateAction<SingleSpace>>
    singleSpace: Spaces
}

export const AddTipologyButton: FC<Props> = ({ setSpace, singleSpace }) => {

    const { loading, setLoading } = useContext(LoadingContext)


    const saveAndAddTipology = () => {
        setLoading(true)

        // POST TIPOLOGIA

        setSpace({
            space: singleSpace.name
        })

        setLoading(false)
    }


    return (
        <div className='font-medium my-4'>
            <h3 className='mb-4'>Información tipologías posibles (opcional)</h3>
            <button className='bg-white p-2 flex gap-4 items-center cursor-pointer  hover:bg-slate-100 transition-all w-full' onClick={saveAndAddTipology}>
                <div className='bg-platinum py-2 px-4 rounded-md'>
                    <img src={plus} alt='plus' />
                </div>
                <p>Guardar y Agregar nueva tipología</p>
            </button>
        </div>
    )
}
