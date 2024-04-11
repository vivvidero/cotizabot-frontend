import { FormEvent, useContext } from "react"
import { LoadingContext } from "../../../context/LoadingContext"
import { Spinner } from "../.."
import { Link, useNavigate, useParams } from "react-router-dom"
import { ApusContext } from "../../../context/ApusContext"
import { EditReferenceForm } from "./EditReferenceForm"



export const EditReferencesTab = () => {

    const { loading, error, setError } = useContext(LoadingContext)
    const navigate = useNavigate()
    const { editReferencesCheck, editInfoCheck, editApu, setEditApu } = useContext(ApusContext)
    const apuId = useParams().apuId

    const addReference = () => {
        if (editApu.references.length < 5) {
            setEditApu((prevState) => {
                return {
                    ...prevState,
                    references: [...prevState.references, { id: editApu.references.length + 1 }]
                }
            }
            )
        } else {
            setError("Alcanzaste el limite maximo de referencias")
            setTimeout(() => {
                setError('')
            }, 4000);
        }
    }


    const goToDataSheet = (e: FormEvent) => {
        e.preventDefault()
        if (!editReferencesCheck) {
            setError("Todos los campos son obligatorios")
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }
        navigate(`/admin/budgets/apus/edit/${apuId}/data-sheet`)
    }

    if (!editInfoCheck) {
        navigate(`/admin/budgets/apus/edit/${apuId}/general-info`)
    }

    return (
        <>
            {editApu.references.map((reference, index) => <EditReferenceForm key={reference.id} formNumber={index} />)}

            <div className="flex gap-4 w-full px-8 mb-4">
                <button onClick={addReference} className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi" disabled={loading}>
                    Agregar referencia
                </button>
            </div>
            {
                error
                &&
                <div className='bg-vivvi p-4 text-white m-4'>
                    {error}
                </div>
            }
            <div className="flex gap-4 w-full px-8">
                <button className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi" disabled={loading} onClick={goToDataSheet}>
                    {loading ? <Spinner /> : "Continuar"}
                </button>
                <Link to={'/admin/budgets/apus'} className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-transparent text-vivvi border-vivvi" >
                    Cancelar
                </Link>
            </div>

        </>
    )
}
