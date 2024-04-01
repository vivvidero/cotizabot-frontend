import { useNavigate } from 'react-router-dom'
import { MainLayout, MiddleLayout } from '../../Layout'
import { AdminCheckbox, AdminInput, AdminProgressBar, LinkButton, SubmitButton } from '../../components'
import { FormEvent, useContext } from 'react'
import { NewProjectContext } from '../../context/NewProjectContext'
import { LoadingContext } from '../../context/LoadingContext'
import { validateFullObject } from '../../helpers/validateFullObject'
import { createProject } from '../../api'

export const AdminNewProject = () => {

const navigate = useNavigate()
const { newProject } = useContext(NewProjectContext)
const { setLoading, setError, error } = useContext(LoadingContext)

/**
 * Función que maneja el envío del formulario.
 * Verifica si el nuevo proyecto es válido, envía la información al servidor y
 * redirige a la página del proyecto creado.
 */
const handleSubmit = (e: FormEvent) => {
  e.preventDefault()
  setLoading(true)

  if (validateFullObject(newProject)) {
    try {
      createProject(newProject)
        .then((data) => {
          setLoading(false)
          navigate(`/new-project/${data.data.projectid}`)
        })
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  } else {
    // Si no se completaron todos los campos, mostrar mensaje de error
    setError("Todos los campos son obligatorios")
    setLoading(false)
    setTimeout(() => {
      setError("")
    }, 3000);
  }
}

return (
  <MainLayout>
    <AdminProgressBar progress={0} />
    <MiddleLayout>
      <h2 className='mb-16 text-3xl text-vivvi font-outfit'>Nuevo Proyecto</h2>
      <form className='flex flex-col gap-6 w-1/3'>
        <AdminInput placeholder={'Nombre del proyecto'} name={'projectname'} />
        <AdminInput placeholder={'Constructora'} name={'constructorname'} />
        <AdminInput placeholder={'Ciudad'} name={'city'} />
        <AdminInput placeholder={'Barrio'} name={'neighborhood'} />
        <AdminInput placeholder={'Dirección'} name={'address'} />
        <div className='flex gap-8'>
          <AdminCheckbox label={'VIS'} name={'type'} value={'VIS'} />
          <AdminCheckbox label={'Usado'} name={'type'} value={'Usado'} />
        </div>
        <div className='flex gap-4 justify-center'>
          <SubmitButton bg={'golden'} handle={handleSubmit}  >
            <p>Continuar</p>
          </SubmitButton>
          <LinkButton link='/admin/projects' bg=''>
            Cancelar
          </LinkButton>
        </div>
      </form>
      {error &&
        <div className='bg-vivvi p-4 text-white m-4'>
          {error}
        </div>
      }
    </MiddleLayout>
  </MainLayout>
)
}