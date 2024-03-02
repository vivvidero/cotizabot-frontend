import { useNavigate } from 'react-router-dom'
import { MainLayout, MiddleLayout } from '../../Layout'
import { AdminCheckbox, AdminInput, LinkButton, SubmitButton } from '../../components'
import { useContext, useEffect, useState } from 'react'
import { LoadingContext } from '../../context/LoadingContext'
import { NewProjectContext } from '../../context'
import api from '../../api'

export const EditProject = () => {

    const navigate = useNavigate()
    const { setLoading } = useContext(LoadingContext)
    const { newProject, setNewProject } = useContext(NewProjectContext)
/*     const [editProject, setEditProject] = useState()
 */

    const handleEdit = () => {
        setLoading(true)
        try {
            api.post(`/projects/new/${newProject.projectid}`, newProject)
                .then((data) => {
                    console.log("Proyecto editado con exito");
                    console.log(data); 
                })
                .then(() => {
                    setLoading(false)
                    navigate('/new-project/tipology')
                })
        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }

    useEffect(() => {
        if (newProject.projectid) {
            api.get(`/proyectos/${newProject.projectid}`)
                .then((data) => {
                    
                    setNewProject(() => {
                        return {
                            ...data.data.project
                        }
                    })
                })
                .catch((err) => console.log(err)
                )
        }
    }, [newProject.projectid, setNewProject])
    

    return (
        <MainLayout>

            <MiddleLayout>
                <h2 className='mb-16 text-3xl text-vivvi font-outfit'>Editar Proyecto</h2>
                <form className='flex flex-col gap-6 w-1/3'>
                    <AdminInput placeholder={'Nombre del proyecto'} name={'projectname'} value={newProject?.projectname} />
                    <AdminInput placeholder={'Constructora'} name={'constructorname'} value={newProject?.constructorname} />
                    <AdminInput placeholder={'Ciudad'} name={'city'} value={newProject?.city} />
                    <AdminInput placeholder={'Barrio'} name={'neighborhood'} value={newProject?.neighborhood} />
                    <AdminInput placeholder={'Dirección'} name={'address'} value={newProject?.address} />
                    <div className='flex gap-8'>
                        <AdminCheckbox label={'VIS'} name={'type'} value={'VIS'} />
                        <AdminCheckbox label={'Usado'} name={'type'} value={'Usado'} />
                    </div>
                    <div className='flex gap-4 justify-center'>
                        <SubmitButton bg={'golden'} handle={handleEdit}  >
                            <p>Guardar edición</p>
                        </SubmitButton>
                        <LinkButton link='/admin/projects' bg=''>
                            Cancelar
                        </LinkButton>
                    </div>
                </form>
            </MiddleLayout>
        </MainLayout>
    )
}
