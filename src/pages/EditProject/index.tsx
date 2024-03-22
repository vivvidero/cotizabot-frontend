import { useNavigate, useParams } from 'react-router-dom'
import { MainLayout, MiddleLayout } from '../../Layout'
import {  EditCheckbox, EditInput, LinkButton, SubmitButton } from '../../components'
import { useContext, useEffect } from 'react'
import { LoadingContext } from '../../context/LoadingContext'
import { NewProjectContext } from '../../context'
import api, { fetchProjectById } from '../../api'

export const EditProject = () => {

    const navigate = useNavigate()
    const { setLoading } = useContext(LoadingContext)
    const { newProject, setNewProject } = useContext(NewProjectContext)
    const { projectid } = useParams()


    const handleEdit = () => {
        setLoading(true)
        try {
            api.put(`/project/${projectid}`, newProject)
                .then(() => {
                    setLoading(false)
                    navigate(`/new-project/${projectid}`)
                })
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (projectid) {
            setLoading(true)
            fetchProjectById(projectid)
                .then((data) => {
                    setNewProject(() => {
                        return {
                            ...data.data.project
                        }
                    })
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                }
                )
        }
    }, [projectid, setNewProject, setLoading])


    return (
        <MainLayout>

            <MiddleLayout>
                <h2 className='mb-16 text-3xl text-vivvi font-outfit'>Editar Proyecto</h2>
                <form className='flex flex-col gap-6 w-1/3'>
                    <EditInput placeholder={'Nombre del proyecto'} name={'projectname'} value={newProject?.projectname} />
                    <EditInput placeholder={'Constructora'} name={'constructorname'} value={newProject?.constructorname} />
                    <EditInput placeholder={'Ciudad'} name={'city'} value={newProject?.city} />
                    <EditInput placeholder={'Barrio'} name={'neighborhood'} value={newProject?.neighborhood} />
                    <EditInput placeholder={'Dirección'} name={'address'} value={newProject?.address} />
                    <div className='flex gap-8'>
                        <EditCheckbox label={'VIS'} name={'type'} value={'VIS'} />
                        <EditCheckbox label={'Usado'} name={'type'} value={'Usado'} />
                    </div>
                    <div className='flex gap-4 justify-center'>
                        <SubmitButton bg={'golden'} handle={handleEdit}  >
                            <p>Guardar edición</p>
                        </SubmitButton>
                        <LinkButton link={`/new-project/${projectid}`} bg=''>
                            Cancelar
                        </LinkButton>
                    </div>
                </form>
            </MiddleLayout>
        </MainLayout>
    )
}
