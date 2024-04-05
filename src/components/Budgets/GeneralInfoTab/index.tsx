import { ChangeEvent, FormEvent, useContext } from "react"
import { NewApuContext } from "../../../context/NewApuContext"
import { LoadingContext } from "../../../context/LoadingContext"
import { Spinner } from "../.."
import { Link, useNavigate } from "react-router-dom"
import MultipleSelectCheckmarks from "../../ui/GeneralInfoTab/MultipleSelect"

export const GeneralInfoTab = () => {

    const { setNewApu, newApu, infoCheck } = useContext(NewApuContext)
    const { loading, setError } = useContext(LoadingContext)
    const navigate = useNavigate()


    const handleNewApu = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

        setNewApu((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleIva = (e: ChangeEvent<HTMLInputElement>) => {
        setNewApu((prevState) => {
            return {
                ...prevState,
                iva: e.target.checked
            }
        })
    }

    const goToReferences = (e: FormEvent) => {

        if (!infoCheck) {
            setError("Todos los campos son obligatorios")
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }

        e.preventDefault()
        console.log(newApu);
        navigate('/admin/budgets/apus/create/references')
    }

    console.log(typeof(newApu.price));


    return (
        <form className="grid grid-cols-3 gap-6 p-8 w-full" onSubmit={goToReferences}>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Código</label>
                <input className='py-6 px-5 border' defaultValue={newApu.code} type='text' placeholder={"Código"} name={"code"} onChange={handleNewApu} required />
            </div>
            <div className="flex flex-col gap-2">

                <label htmlFor="name">Nombre del APU</label>
                <input className='py-6 px-5 border ' defaultValue={newApu.name} type='text' placeholder={"Nombre del APU"} name={"name"} onChange={handleNewApu} required />
            </div>
            <div className="flex flex-col gap-2">

                <label htmlFor="name">Unidad de médida</label>
                <select className='py-6 px-5 border ' name={"unit"} defaultValue={newApu.unit} onChange={handleNewApu} required>
                    <option></option>
                    <option>M3</option>
                    <option>Kg</option>
                    <option>Galones</option>
                    <option>M2</option>
                    <option>Unidad</option>
                    <option>ML</option>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <MultipleSelectCheckmarks />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Categoría</label>
                <select className='py-6 px-5 border ' defaultValue={newApu.category} name={"category"} onChange={handleNewApu} required>
                    <option></option>
                    <option>Pisos</option>
                </select>

            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Subcategoría</label>
                <select className='py-6 px-5 border ' defaultValue={newApu.subCategory} name={"subCategory"} onChange={handleNewApu} required>
                    <option></option>
                    <option>Pisos</option>
                </select>

            </div>
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Precio</label>
                    <input className='py-6 px-5 border ' defaultValue={newApu.price} type='number' min={0} placeholder={"Precio"} name={"price"} onChange={handleNewApu} required />

                </div>
                <div className="flex flex-col gap-2 w-full ">
                    <label htmlFor="name" >IVA (opcional)</label>
                    <div className="w-full p-4 bg-white border h-full flex items-center">
                        <input type='checkbox' defaultChecked={newApu.iva} placeholder={"iva"} name={"iva"} onChange={handleIva} />
                    </div>
                </div>
            </div>
            <div></div>
            <div></div>
            <div className="flex flex-col gap-2">
                <h5>Precio total</h5>
                <div className="bg-honeydew p-2 w-1/2">
                <p className="text-vivvi font-semibold text-2xl"> $ {newApu.iva ? (parseFloat(newApu.price) + (parseFloat(newApu.price) * 0.21)).toFixed(2) : newApu.price} </p>

                </div>
            </div>
            <div></div>
            <div></div>
            <div className="flex gap-4">
                <button className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi" disabled={loading}>
                    {loading ? <Spinner /> : "Continuar"}
                </button>
                <Link to={'/admin/budgets/apus'} className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-transparent text-vivvi border-vivvi" >
                    Cancelar
                </Link>
            </div>

        </form>

    )
}
