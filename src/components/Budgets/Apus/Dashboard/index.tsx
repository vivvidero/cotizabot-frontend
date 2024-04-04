import apusName from '../../../../assets/icons/apus_nombre.png'
import apusm2 from '../../../../assets/icons/apus_m2.png'
import apusEdit from '../../../../assets/icons/Edit.png'
import noItems from '../../../../assets/images/noprojects.png'


export const DashboardInfoApu = ({ apuDashboard }: { apuDashboard: ApuDashboard | undefined }) => {

    const { id } = useParams()

    return (
        <article className="flex w-full items-center justify-between gap-2 bg-white text-vivvi shadow-md pl-8">
            <div className='flex items-end p-4 gap-2'>
                <Link to={`/admin/apus/edit/${id}`} >
                    <img src={apusEdit} alt='editar' />
                </Link  >
                <div className="mx-2 text-platinum text-4xl font-thin">|</div>
                <div className='bg-vivvi w-7 h-7 p-1.5 rounded-full flex justify-center items-center'>
                    <img src={apusName} alt='nombre' />
                </div>
                <div className='mr-12'>
                    <p className='text-cadet-gray'>Nombre</p>
                    <p className='font-medium text-2xl'> {apuDashboard?.name} </p>
                </div>
                <div className="mx-2 text-platinum text-4xl font-thin">|</div>
                <div className='bg-vivvi w-7 h-7 p-1.5 rounded-full flex justify-center items-center'>
                    <img src={apusm2} alt='Unidad' />
                </div>
                <div className='mr-12'>
                    <p className='text-cadet-gray'>Unidad</p>
                    <p className='font-medium text-2xl'> {apuDashboard?.unit} </p>
                </div>
            </div>
            <div className='bg-honeydew rounded-tl-full rounded-bl-full p-4 px-8 w-[264px]'>
                <p className='text-vivvi'>Total</p>
                <p className='font-medium text-2xl'> $ {apuDashboard?.total_value} </p>
            </div>
        </article>
    )
}


import addItem from '../../../../assets/icons/plus-referencia.png'
import { useState } from 'react'
import { AddReferenceModal } from './AddReferenceModal'
import { AddSupplieModal } from './AddSupplieModal'
import { ApuDashboard } from '../../../../types/apus/ApuDashboard'
import { Link, useParams } from 'react-router-dom'


export const AddReferrence = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <article className=" text-vivvi flex flex-col rounded-xl bg-white overflow-hidden">
            <div className="border border-platinum  p-1 px-4 font-semibold flex items-center gap-8">
                <p>
                    Referencias
                </p>
                <button onClick={handleOpen} className="border shadow-xl flex gap-4 px-3 py-1 font-roboto rounded-full items-center hover:scale-105 transition-all duration-200">
                    <img src={addItem} alt="agregar referencia" />
                    <p className='text-sm'>Agregar item</p>
                </button>
            </div>
            <div className="w-full border border-platinum p-4 bg-white font-semibold min-h-[128px] flex flex-col justify-center items-center">
                <img src={noItems} alt='sin referencias' />
                <p>No tienes referencias creadas aún</p>
            </div>
            <AddReferenceModal open={open} handleClose={handleClose} />
        </article>
    )
}
export const AddSupplie = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <article className=" text-vivvi flex flex-col rounded-xl bg-white overflow-hidden">
            <div className="border border-platinum  p-1 px-4 font-semibold flex items-center gap-8">
                <p>
                    Insumos
                </p>
                <button onClick={handleOpen} className="border shadow-xl flex gap-4 px-3 py-1 font-roboto rounded-full items-center hover:scale-105 transition-all duration-200">
                    <img src={addItem} alt="agregar referencia" />
                    <p className='text-sm'>Agregar item</p>
                </button>
            </div>
            <div className="w-full border border-platinum p-4 bg-white font-semibold min-h-[128px] flex flex-col justify-center items-center">
                <img src={noItems} alt='sin referencias' />
                <p>No tienes insumos creadas aún</p>
            </div>
            <AddSupplieModal open={open} handleClose={handleClose} />
        </article>
    )
}


export const DataSheetEmpty = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <article className=" text-vivvi flex flex-col rounded-xl bg-white overflow-hidden">
            <div className="border border-platinum  p-1 px-4 font-semibold flex items-center gap-8">
                <p>
                    Ficha Técnica
                </p>
                <button onClick={handleOpen} className="border shadow-xl flex gap-4 px-3 py-1 font-roboto rounded-full items-center hover:scale-105 transition-all duration-200">
                    <img src={addItem} alt="agregar referencia" />
                    <p className='text-sm'>Agregar ficha</p>
                </button>
            </div>
            <div className="w-full border border-platinum p-4 bg-white font-semibold min-h-[128px] flex flex-col justify-center items-center">
                <img src={noItems} alt='sin referencias' />
                <p>No tienes ficha técnica creada aún</p>
            </div>
            <AddSupplieModal open={open} handleClose={handleClose} />
        </article>
    )
}

export const DataSheetInfo = () => {
    return (
        <article className="  text-vivvi gap-2 flex flex-col">
            <div className="border border-platinum rounded-md p-1 px-4 bg-white w-fit font-semibold">
                Ficha técnica
            </div>
            <div className="border border-platinum rounded-md p-4 bg-white font-semibold">
                <button className="border border-platinum shadow-md flex gap-6 p-2 font-roboto rounded-md hover:scale-105 transition-all duration-200">
                    <img src={apusEdit} alt="agregar referencia" className="border border-vivvi rounded-full p-1 w-6" />
                    <p>Editar</p>
                </button>
                <table className='w-full my-4'>
                    <thead className=' p-1 bg-platinum rounded-md'>
                        <tr>
                            <th className='text-start px-2'>
                                Material
                            </th>
                            <th className='text-start px-2'>
                                Acabado
                            </th>
                            <th className='text-start px-2'>
                                Trafico
                            </th>
                            <th className='text-start px-2'>
                                Garantía
                            </th>
                            <th className='text-start px-2'>
                                Dimensiones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='p-2'>
                                Piso cerámico
                            </td>
                            <td className='p-2'>
                                Piso cerámico
                            </td>
                            <td className='p-2'>
                                Piso cerámico
                            </td>
                            <td className='p-2'>
                                Piso cerámico
                            </td>
                            <td className='p-2'>
                                Piso cerámico
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
    )
}