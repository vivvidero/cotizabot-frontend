import { useNavigate } from 'react-router-dom'
import { MainLayout, MiddleLayout } from '../../Layout'
import { AdminCheckbox, AdminInput, LinkButton, SubmitButton } from '../../components'
import { useContext } from 'react'
import { LoadingContext } from '../../context/LoadingContext'
import { NewProjectContext } from '../../context'

export const EditProject = () => {

    const navigate = useNavigate()
    const { setLoading } = useContext(LoadingContext)
    const { newProject } = useContext(NewProjectContext)

    

    const handleEdit = () => {
        setLoading(true)

    }

    return (
        <MainLayout>

            <MiddleLayout>
                <h2 className='mb-16 text-3xl text-vivvi font-outfit'>Editar Proyecto</h2>
                <form className='flex flex-col gap-6 w-1/3'>
                    <AdminInput placeholder={'Nombre del proyecto'} name={'projectName'} value={newProject.projectName} />
                    <AdminInput placeholder={'Constructora'} name={'constructorName'} value={newProject.constructorName} />
                    <AdminInput placeholder={'Ciudad'} name={'city'} value={newProject.city} />
                    <AdminInput placeholder={'Barrio'} name={'neighborhood'} value={newProject.neighborhood} />
                    <AdminInput placeholder={'Dirección'} name={'address'} value={newProject.address} />
                    <div className='flex gap-8'>
                        <AdminCheckbox label={'VIS'} name={'type'} value={'VIS'} />
                        <AdminCheckbox label={'Usado'} name={'type'} value={'Usado'} />
                    </div>
                    <div className='flex gap-4 justify-center'>
                        <SubmitButton bg={'golden'} handle={handleEdit}  >
                            <p>Continuar</p>
                        </SubmitButton>
                        <LinkButton link='/admin' bg=''>
                            Cancelar
                        </LinkButton>
                    </div>
                </form>
            </MiddleLayout>
        </MainLayout>
    )
}
