import { useEffect, useState } from "react"
import { AdminProyectItem, LinkButton } from ".."
import api from "../../api"

export const AdminProjects = () => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('/proyectos')
            .then((data) => setProjects(data.data))
    }, [])


    console.log(projects);



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
                {projects.map((project) => <AdminProyectItem key={project.projectid} project={project} />)}
            

            </section>
        </>
    )
}
