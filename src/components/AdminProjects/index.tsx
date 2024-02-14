import { useContext, useEffect, useState } from "react"
import { AdminProyectItem, LinkButton, Spinner } from ".."
import noProjects from '../../assets/images/noprojects.png'
import api from "../../api"
import { Projects } from "../../types/Projects"
import { LoadingContext } from "../../context/LoadingContext"

export const AdminProjects = () => {

    const [projects, setProjects] = useState<Projects[]>([])
    const { loading, setLoading } = useContext(LoadingContext)
    
        useEffect(() => {
            setLoading(true)
            api.get('/proyectos')
                .then((data) => {
                    setProjects(data.data)
                })
                .then(() => setLoading(false))
        }, [])

    console.log(projects);


    return (
        <>
            <div className='flex justify-between my-6'>
                {
                    projects.length > 0
                    &&
                    <>
                        <LinkButton link={"new-project"} bg="golden">
                            Nuevo Proyecto
                        </LinkButton>

                        <select className='border border-blue-700 rounded-full text-blue-700'>
                            <option>VIS</option>
                            <option>Usado</option>
                        </select>
                    </>

                }

            </div>

            <section className='flex flex-col gap-4'>
                {
                    projects.length > 0
                    &&
                    <div className='grid grid-cols-12 px-5 py-7'>
                        <div className='col-span-3'></div>
                        <div className='col-span-2'><p>Constructora</p></div>
                        <div className='col-span-2'><p>Ciudad</p></div>
                        <div className='col-span-2'><p>Barrio</p></div>
                        <div className='col-span-2'><p>Dirección</p></div>
                        <div className='col-span-1'></div>
                    </div>
                }

                {
                    loading
                        ?
                        <div className="w-full flex justify-center">
                            <Spinner />
                        </div>
                        :
                        projects.length <= 0
                            ?
                            <div className="w-1/2 m-auto border border-platinum rounded-lg bg-white flex flex-col items-center justify-center gap-6 p-6">
                                <img className="w-1/4" src={noProjects} alt="sin proyectos" />
                                <h3 className="text-2xl font-semibold">No tienes proyectos creados aún</h3>
                                <LinkButton link={"new-project"} bg="golden">
                                    Nuevo Proyecto
                                </LinkButton>
                            </div>
                            :
                            projects.map((project) => <AdminProyectItem key={project.projectid} project={project} />)
                }
            </section>
        </>
    )
}
