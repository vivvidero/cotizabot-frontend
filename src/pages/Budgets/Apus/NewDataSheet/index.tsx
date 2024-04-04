import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { MainLayout, MiddleLayout } from "../../../../Layout"
import { DataSheet } from "../../../../types/apus/DataSheet"
import { Link, useNavigate, useParams } from "react-router-dom"
import { LoadingContext } from "../../../../context/LoadingContext"
import { validateFullObject } from "../../../../helpers/validateFullObject"
import { createDataSheet } from "../../../../api/apus"
import { Spinner } from "../../../../components"

const initialValue = {
    height: 0,
    width: 0,
    depth: 0,
    material: '',
    finish: '',
    traffic: '',
    warranty: '',
    connectionType: '',

}

export const NewDataSheet = () => {
    const [dataSheet, setDataSheet] = useState<DataSheet>(initialValue)
    const { loading, setLoading, setError, error } = useContext(LoadingContext)
    const { apuId } = useParams()
    const navigate = useNavigate()


    const handleDataSheet = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setDataSheet((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        if (validateFullObject(dataSheet)) {
            if (apuId) {
                createDataSheet(dataSheet, apuId)
                    .then((data) => {
                        console.log(data.data);
                        setLoading(false)
                    })
                    .then(() => navigate(`/admin/budgets/apus/create/${apuId}/dashboard`))
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


    return (
        <MainLayout>
            <MiddleLayout>
                <div className="flex flex-col items-center text-vivvi gap-2">
                    <h2 className="font-outfit text-3xl">
                        Nuevo APU
                    </h2>
                    <h3 className="font-roboto text-2xl">Ficha técnica</h3>
                </div>
                <form className="my-8 flex flex-col w-1/2" onSubmit={handleSubmit}>
                    <label className="mb-2">Dimensiones</label>
                    <div className="flex justify-between gap-2 w-full">
                        <input className='py-6 px-5 border mb-8' type='number' placeholder={"Alto"} name={"height"} onChange={handleDataSheet} required />

                        <input className='py-6 px-5 border mb-8' type='number' placeholder={"Ancho"} name={"width"} onChange={handleDataSheet} required />

                        <input className='py-6 px-5 border mb-8' type='number' placeholder={"Fondo"} name={"depth"} onChange={handleDataSheet} required />
                    </div>
                    <label htmlFor="material">Material</label>
                    <input className='py-6 px-5 border mb-8' type='text' placeholder={"Material"} name={"material"} onChange={handleDataSheet} required />
                    <label htmlFor="finish">Acabado</label>
                    <input className='py-6 px-5 border mb-8' type='text' placeholder={"Acabado"} name={"finish"} onChange={handleDataSheet} required />
                    <label htmlFor="traffic">Trafico</label>
                    <select className='py-6 px-5 border mb-8' name={"traffic"} onChange={handleDataSheet}>
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <label htmlFor="warranty">Garantía</label>
                    <input className='py-6 px-5 border mb-8' type='text' placeholder={"Garantía"} name={"warranty"} onChange={handleDataSheet} required />
                    <label htmlFor="warranty">Tipo de Conexión</label>
                    <input className='py-6 px-5 border mb-8' type='text' placeholder={"Tipo de Conexión"} name={"connectionType"} onChange={handleDataSheet} required />
                    <label htmlFor="warranty">Comentario técnico</label>
                    <textarea className='py-6 px-5 border mb-8' placeholder={"Comentario técnico"} name={"technicalComment"} onChange={handleDataSheet} />
                    {
                        error &&
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
