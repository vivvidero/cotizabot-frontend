import { Link } from 'react-router-dom'
import { MainLayout, MiddleLayout } from '../../Layout'
import { AdminProgressBar, LinkButton } from '../../components'
import { ChangeEvent, useContext } from 'react'
import { NewProjectContext } from '../../context/NewProjectContext'

export const AdminNewProject = () => {


  const { setNewProject, newProject } = useContext(NewProjectContext)

  const handleProject = (e: ChangeEvent<HTMLInputElement>) => {

    setNewProject((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
    localStorage.setItem('newProject', JSON.stringify({ ...newProject, [e.target.name]: e.target.value }));
  }

  console.log(newProject);
  

  return (
    <MainLayout>
      <AdminProgressBar progress={0} />
      <MiddleLayout>
        <h2 className='mb-16 text-3xl text-vivvi font-outfit'>Nuevo Proyecto</h2>
        <form className='flex flex-col gap-6 w-1/3'>
          <input className='py-6 px-5 border' placeholder='Nombre del proyecto' name='projectName' value={newProject.projectName} onChange={handleProject} />
          <input className='py-6 px-5 border' placeholder='Constructora' name='constructionName' value={newProject.constructionName} onChange={handleProject} />
          <input className='py-6 px-5 border' placeholder='Ciudad' name='city' value={newProject.city} onChange={handleProject} />
          <div className='flex gap-4'>
            <LinkButton link={'/new-project/tipology'} bg={'golden'}>
              Continuar
            </LinkButton >
            <Link to={"/admin"} className='grid place-content-center px-5 border border-vivvi rounded-full'>
              Cancelar
            </Link >
          </div>
        </form>
      </MiddleLayout>
    </MainLayout>
  )
}
