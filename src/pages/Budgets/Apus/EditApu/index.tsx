import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { MainLayout, MiddleLayout } from "../../../../Layout"
import { editApu, fetchApuDashBoard } from "../../../../api/apus"
import { ApuInfo } from "../../../../types/apus/ApuInfo"
import { validateFullObject } from "../../../../helpers/validateFullObject"
import { LoadingContext } from "../../../../context/LoadingContext"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Spinner } from "../../../../components"

const initialValue = {
    name: '',
    unit: '',
    category: '',
    subCategory: ''
}


export const EditApu = () => {

    const navigate = useNavigate()
    const { loading, setLoading, setError, error } = useContext(LoadingContext)
    const { id } = useParams()
    const [apuToEdit, setApuToEdit] = useState<ApuInfo>(initialValue)

    useEffect(() => {
        if (id) {
            fetchApuDashBoard(id)
                .then((data) => {
                    setApuToEdit({
                        name: data.data.apu.name,
                        unit: data.data.apu.unit,
                        category: data.data.apu.category,
                        subCategory: data.data.apu.subcategory
                    })
                })
        }

    }, [id])

    console.log(apuToEdit);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        if (validateFullObject(apuToEdit)) {
            if (id) {
                editApu(id, apuToEdit)
                    .then(() => {
                        setLoading(false)
                        navigate(`/admin/budgets/apus/create/${id}/dashboard`)
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false)
                    })
            }
        } else {
            setError("Todos los campos son obligatorios")
            setLoading(false)
            setTimeout(() => {
                setError('')
            }, 3500);
        }
    }

    const handleEditApu = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setApuToEdit((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }


    return (
        <MainLayout>
            <MiddleLayout>
                <div className="flex flex-col items-center text-vivvi gap-2">
                    <h2 className="font-outfit text-3xl">
                        Nuevo APU
                    </h2>
                    <h3 className="font-roboto text-2xl">Datos generales</h3>
                </div>
                <form className="my-8 flex flex-col w-1/2" onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre del APU</label>
                    <input className='py-6 px-5 border mb-8' type='text' placeholder={"Nombre del APU"} name={"name"} onChange={handleEditApu} required value={apuToEdit?.name} />
                    <label htmlFor="unit">Unidad de médida</label>
                    <select className='py-6 px-5 border mb-8' name={"unit"} onChange={handleEditApu} required value={apuToEdit?.unit}>
                        <option>M3</option>
                        <option>Kg</option>
                        <option>Galones</option>
                        <option>M2</option>
                        <option>Unidad</option>
                        <option>ML</option>
                    </select>
                    <label htmlFor="category">Categoría</label>
                    <select className='py-6 px-5 border mb-8' name={"category"} onChange={handleEditApu} required value={apuToEdit?.category}>

                        <option>Pisos</option>
                    </select>
                    <label htmlFor="subCategory">Subcategoría</label>
                    <select className='py-6 px-5 border mb-8' name={"subCategory"} onChange={handleEditApu} required value={apuToEdit?.subCategory}>
                        <option>Pisos</option>
                        <option>Enchapes</option>
                    </select>
                    {
                        error
                        &&
                        <div className='bg-vivvi p-4 text-white m-4'>
                            {error}
                        </div>
                    }
                    <div className="flex gap-4">
                        <button className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi" disabled={loading}>
                            {loading ? <Spinner /> : "Continuar"}
                        </button>
                        <Link to={'/admin/budgets/apus'} className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-transparent text-vivvi border-vivvi" >
                            Cancelar
                        </Link>
                    </div>

                </form>
            </MiddleLayout>
        </MainLayout>
    )
}
