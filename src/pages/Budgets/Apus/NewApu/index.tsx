import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { MainLayout, MiddleLayout } from "../../../../Layout"
import { createApu } from "../../../../api/apus"
import { ApuInfo } from "../../../../types/apus/ApuInfo"
import { validateFullObject } from "../../../../helpers/validateFullObject"
import { LoadingContext } from "../../../../context/LoadingContext"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Spinner } from "../../../../components"
import { ApuTabs } from "../../../../components/Budgets/ApuTabs"
import { NewApuContext } from "../../../../context/NewApuContext"



export const NewApu = () => {

  const navigate = useNavigate()
  const { loading, setLoading, setError, error } = useContext(LoadingContext)
  const {newApu, setNewApu} = useContext(NewApuContext)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (validateFullObject(newApu)) {
      createApu(newApu)
        .then((data) => {
          console.log(data.data);
          setLoading(false)
          navigate(`/admin/budgets/apus/create/${data.data.id}/dashboard`)
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        })
    } else {
      setError("Todos los campos son obligatorios")
      setLoading(false)
      setTimeout(() => {
        setError('')
      }, 3500);
    }
  }

  const handleNewApu = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setNewApu((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <MainLayout>
      <MiddleLayout>
        <div className="flex justify-start w-full text-vivvi gap-2">
          <h2 className="font-outfit text-3xl mx-12">
            Nuevo APU
          </h2>
        </div>

        <ApuTabs />
        {/* <form className="grid grid-cols-3 gap-6 p-8 w-full "> */}
          <Outlet />
        {/* </form> */}

        {/* <form className="my-8 flex flex-col w-1/2" onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre del APU</label>
          <input className='py-6 px-5 border mb-8' type='text' placeholder={"Nombre del APU"} name={"name"} onChange={handleNewApu} required />
          <label htmlFor="name">Unidad de médida</label>
          <select className='py-6 px-5 border mb-8' name={"unit"} onChange={handleNewApu} required>
            <option></option>
            <option>M3</option>
            <option>Kg</option>
            <option>Galones</option>
            <option>M2</option>
            <option>Unidad</option>
            <option>ML</option>
          </select>
          <label htmlFor="name">Categoría</label>
          <select className='py-6 px-5 border mb-8' name={"category"} onChange={handleNewApu} required>
            <option></option>
            <option>Pisos</option>
          </select>
          <label htmlFor="name">Subcategoría</label>
          <select className='py-6 px-5 border mb-8' name={"subCategory"} onChange={handleNewApu} required>
            <option></option>
            <option>Pisos</option>
          </select>
          {
            error
            &&
            <div className='bg-vivvi p-4 text-white m-4'>
              {error}
            </div>
          }
          <div className="flex gap-4">
            <button className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi" disabled={loading}>
              {loading ? <Spinner /> : "Continuar"}
            </button>
            <Link to={'/admin/budgets/apus'} className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-transparent text-vivvi border-vivvi" >
              Cancelar
            </Link>
          </div>

        </form> */}
      </MiddleLayout>
    </MainLayout>
  )
}
