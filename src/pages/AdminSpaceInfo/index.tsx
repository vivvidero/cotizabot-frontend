import { FormEvent, useContext, useState } from 'react'
import { MainLayout, MiddleLayout } from '../../Layout'
import { AdminProgressBar, LinkButton, NewProjectModal } from '../../components'
import { NewProjectContext } from '../../context'
import { AdminSpaceKitchen } from '../../components/AdminSpacesInfo/AdminSpaceKitchen/AdminSpaceKitchen'
import { AdminSpaceClothes } from '../../components/AdminSpacesInfo/AdminSpaceClothes/AdminSpaceClothes'
import { AdminSpaceBathRoomWithShower } from '../../components/AdminSpacesInfo/AdminSpaceBathRoomWithShower/AdminSpaceBathRoomWithShower'
import { AdminSpaceBedRoom } from '../../components/AdminSpacesInfo/AdminSpaceBedRoom/AdminSpaceBedRoom'
import { AdminSpaceStudy } from '../../components/AdminSpacesInfo/AdminSpaceStudy/AdminSpaceStudy'
import { AdminSpaceTerrace } from '../../components/AdminSpacesInfo/AdminSpaceTerrace/AdminSpaceTerrace'
import check from '../../assets/icons/check.png'
import api from '../../api'
import { AdminSpaceSocialBathRoom } from '../../components/AdminSpacesInfo/AdminSpaceSocialBathRoom/AdminSpaceSocialBathRoom'
import { AdminSpaceDiningRoom } from '../../components/AdminSpacesInfo/AdminSpaceDiningRoom/AdminSpaceDiningRoom'
import { AdminSpaceHall } from '../../components/AdminSpacesInfo/AdminSpaceHall/AdminSpaceHall'
import { AdminSpaceBalcony } from '../../components/AdminSpacesInfo/AdminSpaceBalcony/AdminSpaceBalcony'

export const AdminSpaceInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { newProject, setNewProject } = useContext(NewProjectContext)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      api.post('/proyectos', newProject)
        .then((data) => console.log(data.data))
        .then(() => setIsModalOpen(true))

      localStorage.removeItem('newProject')
      setNewProject({
        projectName: '',
        constructionName: '',
        city: '',
        tipologies: [],
        spaces: []

      })
    } catch (error) {
      console.log(error);

    }

  }

  console.log(newProject);


  return (
    <MainLayout>
      <AdminProgressBar progress={isModalOpen ? 5 : 4} />
      <MiddleLayout>
        <h2 className="font-outfit text-2xl text-vivvi">Ingresa la información de cada espacio</h2>

        <form className="flex flex-col gap-6 w-6/12 my-6">
          {newProject.spaces.filter(space => space.name === "kitchen").map((space) => <AdminSpaceKitchen key={space.roomNumber} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'clothes').map(space => <AdminSpaceClothes key={space.roomNumber} space={space} />)}
          {newProject.spaces.filter(space => space.name === "bathRoomWithShower").map((space) => <AdminSpaceBathRoomWithShower key={space.roomNumber} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'socialBathRoomWithoutShower').map((space) => <AdminSpaceSocialBathRoom key={space.roomNumber} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'bedRoom').map((space) => <AdminSpaceBedRoom key={space.roomNumber} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'study').map((space) => <AdminSpaceStudy key={space.roomNumber} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'diningRoom').map((space) => <AdminSpaceDiningRoom key={space.roomNumber} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'hall').map((space) => <AdminSpaceHall key={space.roomNumber} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'terraceYard').map((space) => <AdminSpaceTerrace key={space.roomNumber} space={space} />)}
          {newProject.spaces.filter(space => space.name === 'balcony').map((space) => <AdminSpaceBalcony key={space.roomNumber} space={space} />)}
          <div className=" flex gap-5">
            <button onClick={handleSubmit} className={`flex items-center justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi`}>
              Continuar
            </button>
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
