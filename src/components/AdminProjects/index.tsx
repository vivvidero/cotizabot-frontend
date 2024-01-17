import { AdminProyectItem, LinkButton } from ".."

export const AdminProjects = () => {
    return (
        <>
            <div className='flex justify-between my-6'>
                <LinkButton link={"new-project"} bg="golden">
                    Nuevo Proyecto
                </LinkButton>

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
        </>
    )
}
