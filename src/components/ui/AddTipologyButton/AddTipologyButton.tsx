import { Dispatch, FC, SetStateAction, useContext } from 'react'
import plus from '../../../assets/icons/Plus.png'
import { SingleSpace, Spaces } from '../../../types/Spaces'
import { LoadingContext } from '../../../context/LoadingContext'
import api from '../../../api'
import { NewProjectContext } from '../../../context'

interface Props {
    setSpace: Dispatch<SetStateAction<SingleSpace>>
    singleSpace: Spaces,
    space: SingleSpace,

}

export const AddTipologyButton: FC<Props> = ({ setSpace, singleSpace, space }) => {

    const { setLoading } = useContext(LoadingContext)
    const { newProject } = useContext(NewProjectContext)


    const saveAndAddTipology = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setLoading(true)
        // POST ESPACIO
        try {
            api.post('/spaces', { typologyid: newProject.activeTypologyId, ...space })
                .then((data) => {
                    console.log(data.data);
                    setSpace({
                        spacetype: singleSpace?.name,
                        roomnumber: singleSpace?.roomnumber,
                        spaceid: singleSpace?.spaceid
                    })
                })
            alert('Tipologia de espacio guardado')
        } catch (error) {
            console.log(error);

        }


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
