import { ChangeEvent, useContext, useEffect, useState } from "react"
import { AdminProyectItem, LinkButton, ProjectsSkeleton } from "../.."
import { fetchProjects, fetchProjectsPages } from "../../../api"
import { Projects } from "../../../types/Projects"
import { LoadingContext } from "../../../context/LoadingContext"
import { MenuItem, Pagination, Select } from "@mui/material"
import { NoDataBox } from "../../ui/NoDataBox"

export const ProjectsList = () => {
    // Estado para almacenar la lista de proyectos
    const [projects, setProjects] = useState<Projects[]>([])
    // Contexto de carga para mostrar indicador de carga
    const { loading, setLoading } = useContext(LoadingContext)
    // Estado para el tipo de proyectos a mostrar
    const [projectsType, setProjectType] = useState<string>("VIS")

    const [totalPages, setTotalPages] = useState<number>(1)
    const [page, setPage] = useState(1);

    // GET para cargar la lista de proyectos al montar el componente
    useEffect(() => {
        setLoading(true)
        fetchProjects(page, projectsType)
            .then((data) => {
                setProjects(data.data.reverse())
                fetchProjectsPages(projectsType)
                    .then((data) => setTotalPages(data)
                    )
            })
            .then(() => setLoading(false))
    }, [setLoading, page, projectsType])

    const handlePage = (_: ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }


    return (
        <>
            <div className='flex justify-between my-6'>
                <LinkButton link={"new-project"} bg="golden">
                    Nuevo Proyecto
                </LinkButton>
                <Select onChange={(event) => {
                    setProjectType(event.target.value as string)
                    setPage(1)
                }} defaultValue={"VIS"}>
                    <MenuItem value={"VIS"} >VIS</MenuItem>
                    <MenuItem value={"Usado"} >Usado</MenuItem>
                </Select>
            </div>
            <Pagination count={totalPages} onChange={handlePage} />
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
                            <NoDataBox data={"Proyectos"} />
                            :
                            projects.filter((project) => project.type === projectsType).map((project) => <AdminProyectItem key={project.projectid} project={project} setProjects={setProjects} />)
                }
            </section>
        </>
    )
}
