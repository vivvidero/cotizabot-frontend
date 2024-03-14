import { useContext, useEffect, useState } from "react"
import { AdminProyectItem, LinkButton, ProjectsSkeleton } from ".."
import noProjects from '../../assets/images/noprojects.png'
import api from "../../api"
import { Projects } from "../../types/Projects"
import { LoadingContext } from "../../context/LoadingContext"
import { MenuItem, Select } from "@mui/material"
/* import { NewProjectContext } from "../../context"
 */
export const AdminProjects = () => {

    const [projects, setProjects] = useState<Projects[]>([])
    const { loading, setLoading } = useContext(LoadingContext)
/*     const { setNewProject } = useContext(NewProjectContext)
 */    const [projectsType, setProjectType] = useState<string>("VIS")


    useEffect(() => {
        setLoading(true)
        api.get('/proyectos')
            .then((data) => {
                setProjects(data.data.reverse())
            })
            .then(() => setLoading(false))
        /* setNewProject({
            projectname: '',
            constructorname: '',
            city: '',
            neighborhood: '',
            type: '',
            address: '',
        })
        localStorage.removeItem('newProject') */


        // NO AGREGAR DEPENDENCIAS PORQUE SE EJECUTA EN BUCLE
    }, [])


    return (
        <>
            <div className='flex justify-between my-6'>
                <LinkButton link={"new-project"} bg="golden">
                    Nuevo Proyecto
                </LinkButton>
                <Select onChange={(event) => setProjectType(event.target.value as string)} defaultValue={"VIS"}>
                    <MenuItem value={"VIS"} >VIS</MenuItem>
                    <MenuItem value={"Usado"} >Usado</MenuItem>
                </Select>
            </div>
            <section className='flex flex-col gap-4'>
                    <div className='grid grid-cols-12 px-5 py-7'>
                        <div className='col-span-3'></div>
                        <div className='col-span-2'><p>Constructora</p></div>
                        <div className='col-span-2'><p>Ciudad</p></div>
                        <div className='col-span-2'><p>Barrio</p></div>
                        <div className='col-span-2'><p>Dirección</p></div>
                        <div className='col-span-1'></div>
                    </div>
                {
                    loading
                        ?
                        <ProjectsSkeleton />
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
                            projects.filter((project) => project.type === projectsType).map((project) => <AdminProyectItem key={project.projectid} project={project} setProjects={setProjects} />)
                }
            </section>
        </>
    )
}
