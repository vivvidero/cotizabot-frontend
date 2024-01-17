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

export const AdminSpaceInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { newProject } = useContext(NewProjectContext)
  const bathRoomQuantity = Array.from({ length: newProject.spaces.bathRoom.quantity }, (_, index) => index + 1)
  const bedRoomQuantity = Array.from({ length: newProject.spaces.bedRoom.quantity }, (_, index) => index + 1)
  const studyQuantity = Array.from({ length: newProject.spaces.study.quantity }, (_, index) => index + 1)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
    localStorage.setItem('newProject', JSON.stringify({ ...newProject, spaces: newProject.spaces }));


  }
  return (
    <MainLayout>
      <AdminProgressBar progress={isModalOpen ? 5 : 4} />
      <MiddleLayout>
        <h2 className="font-outfit text-2xl text-vivvi">Ingresa la información de cada espacio</h2>

        <form className="flex flex-col gap-6 w-6/12 my-6">
          {newProject.spaces.kitchen.isCheck && <AdminSpaceKitchen />}
          {newProject.spaces.clothes.isCheck && <AdminSpaceClothes />}
          {newProject.spaces.bathRoom.isCheck &&
            bathRoomQuantity.map((_, index) => <AdminSpaceBathRoom key={index} bathNumber={index + 1} />)
          }
          {newProject.spaces.bedRoom.isCheck &&
            bedRoomQuantity.map((_, index) => <AdminSpaceBedRoom key={index} bedNumber={index + 1} />)
          }
          {newProject.spaces.study.isCheck &&
            studyQuantity.map((_, index) => <AdminSpaceStudy key={index} studyNumber={index + 1} />)
          }
          {newProject.spaces.terrace.isCheck && <AdminSpaceTerrace />}
          <div className=" flex gap-5">
            <button onClick={handleSubmit} className={`flex items-center justify-center gap-2 px-5 py-2 w-52 rounded-full text-lg hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi`}>
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
