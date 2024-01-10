import { Link } from 'react-router-dom'
import { MainLayout } from '../../Layout'
import { AdminProyectItem } from '../../components'

export const Admin = () => {
    return (
        <MainLayout>
            <div className='px-10 py-16 bg-snow h-screen'>
                <nav>
                    <ul className='flex gap-4 font-outfit text-2xl font-light'>
                        <li>Proyectos</li>
                        <li>Presupuestos</li>
                    </ul>
                </nav>
                <div className='flex justify-between my-6'>
                    <Link to={"/new-project"} className='bg-dorado p-2 rounded-full border border-vivvi text-vivvi'>
                        Nuevo Proyecto
                    </Link>

                    <select className='border border-blue-700 rounded-full text-blue-700'>
                        <option>VIS</option>
                        <option>Usado</option>
                    </select>
                </div>

                <section className='flex flex-col gap-4'>
                    <div className='grid grid-cols-12 px-5 py-7'>
                        <div className='col-span-4'></div>
                        <div><p>Número</p></div>
                        <div><p>Tipo</p></div>
                        <div className='col-span-2'><p>Constructora</p></div>
                        <div><p>Vivienda</p></div>
                        <div className='col-span-2'><p>Área Construida</p></div>
                        <div className='col-span-1'></div>
                    </div>
                    <AdminProyectItem />
                    <AdminProyectItem />
                    <AdminProyectItem />
                    <AdminProyectItem />
                    



                </section>
            </div>
        </MainLayout>
    )
}
