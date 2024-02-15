import { useNavigate } from 'react-router-dom'
import { MainLayout, MiddleLayout } from '../../Layout'
import { AdminCheckbox, AdminInput, AdminProgressBar, LinkButton, Spinner, SubmitButton } from '../../components'
import { useContext } from 'react'
import { NewProjectContext } from '../../context/NewProjectContext'
import api from '../../api'
import { LoadingContext } from '../../context/LoadingContext'

export const AdminNewProject = () => {

  const navigate = useNavigate()
  const { newProject, setNewProject } = useContext(NewProjectContext)
  const { setLoading, loading } = useContext(LoadingContext)

  const handleSubmit = () => {
    setLoading(true)
    /* api.post('/new-project', newProject)
      .then((data) => {
        setNewProject((prevState) => {
          return {
            ...prevState,
            projectId: data.data
          }
        })
      })
      .then(() => {
        setLoading(false)
        navigate('/new-project/tipology')
      }) */

    // BORRAR LUEGO DE INTEGRAR BACKEND
    setLoading(false)
    navigate('/new-project/tipology')
  }

  console.log(newProject);
  

  return (
    <MainLayout>
      <AdminProgressBar progress={0} />
      <MiddleLayout>
        <h2 className='mb-16 text-3xl text-vivvi font-outfit'>Nuevo Proyecto</h2>
        <form className='flex flex-col gap-6 w-1/3'>
          <AdminInput placeholder={'Nombre del proyecto'} name={'projectname'} value={newProject.projectname} />
          <AdminInput placeholder={'Constructora'} name={'constructorname'} value={newProject.constructorname} />
          <AdminInput placeholder={'Ciudad'} name={'city'} value={newProject.city} />
          <AdminInput placeholder={'Barrio'} name={'neighborhood'} value={newProject.neighborhood} />
          <AdminInput placeholder={'Dirección'} name={'address'} value={newProject.address} />
          <div className='flex gap-8'>
            <AdminCheckbox label={'VIS'} name={'type'} value={'VIS'} />
            <AdminCheckbox label={'Usado'} name={'type'} value={'Usado'} />
          </div>
          <div className='flex gap-4 justify-center'>
            <SubmitButton bg={'golden'} handle={handleSubmit}  >             
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
