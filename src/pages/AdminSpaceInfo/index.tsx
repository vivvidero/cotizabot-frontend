import { FormEvent, useContext, useState } from 'react'
import { MainLayout, MiddleLayout } from '../../Layout'
import { AdminProgressBar, LinkButton, NewProjectModal } from '../../components'
import { NewProjectContext } from '../../context'
import { AdminSpaceKitchen } from '../../components/AdminSpacesInfo/AdminSpaceKitchen/AdminSpaceKitchen'
import { AdminSpaceClothes } from '../../components/AdminSpacesInfo/AdminSpaceClothes/AdminSpaceClothes'
import { AdminSpaceBathRoom } from '../../components/AdminSpacesInfo/AdminSpaceBathRoom/AdminSpaceBathRoom'
import { AdminSpaceBedRoom } from '../../components/AdminSpacesInfo/AdminSpaceBedRoom/AdminSpaceBedRoom'
import { AdminSpaceStudy } from '../../components/AdminSpacesInfo/AdminSpaceStudy/AdminSpaceStudy'
import { AdminSpaceTerrace } from '../../components/AdminSpacesInfo/AdminSpaceTerrace/AdminSpaceTerrace'
import check from '../../assets/icons/check.png'
import { AdminSpaceShower } from '../../components/AdminSpacesInfo/AdminSpaceShower/AdminSpaceShower'
import api from '../../api'

export const AdminSpaceInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { newProject, setNewProject } = useContext(NewProjectContext)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    api.post('/proyectos', newProject)
      .then((data) => console.log(data.data))
      .then(() => setIsModalOpen(true))

    localStorage.removeItem('newProject')
    setNewProject({
      projectName: '',
      constructionName: '',
      tipology: {
        tipologyName: '',
        tipologyType: '',
        tipologyPrivateArea: '',
        tipologyConstructedArea: '',
        tipologyImage: null
      },
      spaces: []

    })
  }

  return (
    <MainLayout>
      <AdminProgressBar progress={isModalOpen ? 5 : 4} />
      <MiddleLayout>
        <h2 className="font-outfit text-2xl text-vivvi">Ingresa la información de cada espacio</h2>

        <form className="flex flex-col gap-6 w-6/12 my-6">
          {newProject.spaces.filter(space => space.name === "kitchen").map((space) => <AdminSpaceKitchen key={space.number} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'clothes').map(space => <AdminSpaceClothes key={space.number} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'bathRoom').map((space) => <AdminSpaceBathRoom key={space.number} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'shower').map((space) => <AdminSpaceShower key={space.number} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'bedRoom').map((space) => <AdminSpaceBedRoom key={space.number} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'study').map((space) => <AdminSpaceStudy key={space.number} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'terrace').map((space) => <AdminSpaceTerrace key={space.number} space={space} />)}
          <div className=" flex gap-5">
            <button onClick={handleSubmit} className={`flex items-center justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi`}>
              Continuar
            </button    >
            <LinkButton link="/" bg="">
              Cancelar
            </LinkButton>
          </div>
        </form>
        <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className='text-3xl font-roboto mb-4'>Proyecto guardado 🔥</h2>
          <div>
            <img src={check} alt='check' />
          </div>
          <LinkButton link="/admin/projects" bg="golden">
            Finalizar
          </LinkButton>
        </NewProjectModal>
      </MiddleLayout>
    </MainLayout>
  )
}
