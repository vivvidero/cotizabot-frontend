import { Dispatch, FC, SetStateAction, useContext } from 'react'
import plus from '../../../assets/icons/Plus.png'
import { SingleSpace, Spaces } from '../../../types/Spaces'
import { LoadingContext } from '../../../context/LoadingContext'
import api from '../../../api'
import { validateSpaceForm } from '../../../helpers/validateSpaceForm'
import { useParams } from 'react-router-dom'

interface ImagePreview {
    url: string,
    name: string,
}

const initialImagePreview: ImagePreview = {
    url: '',
    name: ''
}

interface Props {
    setSpace: Dispatch<SetStateAction<SingleSpace>>
    singleSpace: Spaces,
    space: SingleSpace,
    formDataSpaceTypo: FormData
    setFormDataSpaceTypo: Dispatch<SetStateAction<FormData>>
    setImagePreviewactualstatus: Dispatch<SetStateAction<ImagePreview>>
    setImagePreview3D: Dispatch<SetStateAction<ImagePreview>>
    setComment: Dispatch<SetStateAction<boolean>>
}
/**
 * Componente que muestra un botón para guardar y agregar una nueva tipología.
 */
export const AddTipologyButton: FC<Props> = ({ setSpace, singleSpace, space, formDataSpaceTypo, setFormDataSpaceTypo, setImagePreviewactualstatus, setImagePreview3D, setComment }) => {

    const { setLoading, setError } = useContext(LoadingContext)
    const { typologyid } = useParams()

    /**Guarda y agrega una nueva tipología. **/
    const saveAndAddTipology = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true)

        if (!typologyid) {
            console.log("NO HAY ID DE TIPOLOGIA");
            setLoading(false)
            return
        }

        // Valida que el formulario este completo
        if (!validateSpaceForm(space)) {
            console.log("Faltan datos");
            setError("Todos los campos son obligatorios")
            setLoading(false)
            setTimeout(() => {
                setError('')
            }, 4000);
            return
        }

        const jsonBlobSpace = new Blob([JSON.stringify(space)], { type: 'application/json' });
        const jsonBlobTypologyId = new Blob([JSON.stringify({ typologyId: typologyid })], { type: 'application/json' });

        formDataSpaceTypo.append('space', jsonBlobSpace, 'space.json')
        formDataSpaceTypo.append('typologyId', jsonBlobTypologyId, 'typologyId.json')

        try {
            api.post('/spaces', formDataSpaceTypo)
                .then((data) => {
                    console.log(data.data);
                    setSpace({
                        spacetype: singleSpace?.name,
                        roomnumber: singleSpace?.roomnumber,
                        spaceid: singleSpace?.spaceid
                    })
                    setFormDataSpaceTypo(new FormData)
                    setImagePreview3D(initialImagePreview)
                    setImagePreviewactualstatus(initialImagePreview)
                    setComment(false)
                })
                .then(() => {
                    alert('Tipologia de espacio guardado')
                    setLoading(false)
                })
        } catch (error) {
            console.log(error);
        }
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
