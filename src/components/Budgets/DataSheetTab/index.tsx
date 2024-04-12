import { ChangeEvent, FormEvent, useContext } from 'react'
import { ApusContext } from '../../../context/ApusContext'
import { LoadingContext } from '../../../context/LoadingContext'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from '../../ui'
import {  createApu } from '../../../api/apus'

export const DataSheetTab = () => {

    const { newApu, setNewApu, apuFormData, dataSheetCheck, infoCheck, referencesCheck } = useContext(ApusContext)
    const { loading, setError, setLoading } = useContext(LoadingContext)
    const navigate = useNavigate()


    const handleNewApu = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setNewApu((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const saveApu = (e: FormEvent) => {
        setLoading(true)
        e.preventDefault()
        if (!dataSheetCheck) {
            setError("Todos los campos son obligatorios")
            setTimeout(() => {
                setError('')
            }, 3000);
            setLoading(false)
            return
        }
        const jsonBlobApu = new Blob([JSON.stringify(newApu)], { type: 'application/json' });

        apuFormData.append('apuData', jsonBlobApu)

        try {
            createApu(apuFormData)
                .then((data) => {
                    console.log(data);

                    setLoading(false)
                    navigate('/admin/budgets')
                }
                )
        } catch (error) {
            setLoading(false)
            console.log(error);

        }

    }

    if (!infoCheck || !referencesCheck) {
        navigate('/admin/budgets/apus/create/references')
    }

    return (
        <form className="grid grid-cols-3 gap-6 p-8 w-full" onSubmit={saveApu}>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Dimensión</label>
                <input className='py-6 px-5 border' defaultValue={newApu.dimension} type='text' placeholder={"Dimensión"} name={"dimension"} onChange={handleNewApu} required />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Acabado</label>
                <input className='py-6 px-5 border ' defaultValue={newApu.finish} type='text' placeholder={"Acabado"} name={"finish"} onChange={handleNewApu} required />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Tipo de conexión (aplica para equipos)</label>
                <select className='py-6 px-5 border ' defaultValue={newApu.conectionType} name={"conectionType"} onChange={handleNewApu} required>
                    <option>No aplica</option>
                    <option>M3</option>
                    <option>Kg</option>
                    <option>Galones</option>
                    <option>M2</option>
                    <option>Unidad</option>
                    <option>ML</option>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Recomendaciones</label>
                <textarea className='py-6 px-5 border h-40' name='recomendations' defaultValue={newApu.recomendations} onChange={handleNewApu} />
            </div>
            <div></div>
            <div></div>
            <div className="flex gap-4">
                <button className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi" disabled={loading} onClick={saveApu}>
                    {loading ? <Spinner /> : "Guardar Apu"}
                </button>
                <Link to={'/admin/budgets'} className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-transparent text-vivvi border-vivvi" >
                    Cancelar
                </Link>
            </div>

        </form>
    )
}
