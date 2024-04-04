import { useContext, useEffect, useState } from "react"
import { MainLayout } from "../../../../Layout"

import { AddReferrence, AddSupplie, DashboardInfoApu, DataSheetEmpty } from "../../../../components/Budgets/Apus/Dashboard"
import { LoadingContext } from "../../../../context/LoadingContext"
import { Link, useParams } from "react-router-dom"
import { fetchApuDashBoard } from "../../../../api/apus"
import { ApuDashboard } from "../../../../types/apus/ApuDashboard"



export const ApusDashboard = () => {

  const { loading } = useContext(LoadingContext)
  const [apuDashboard, setApuDashboard] = useState<ApuDashboard>()
  const { id } = useParams()
  
  useEffect(() => {
    if (id) {
      fetchApuDashBoard(id)
        .then((data) => {
          console.log(data.data.apu);
          setApuDashboard(data.data.apu)
        })
    }

  }, [id])
  
  return (
    <MainLayout>

      <DashboardInfoApu apuDashboard={apuDashboard} />
      <div className="flex flex-col w-full gap-8 mt-8 px-12 m-auto">
        <AddReferrence />
        <AddSupplie />
        <DataSheetEmpty />
        <div className="flex gap-4 ">
          <button className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi" disabled={loading}>
            Guardar
          </button>
          <Link to={'/admin/budgets/apus'} className="flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-transparent text-vivvi border-vivvi">
            Cancelar
          </Link>
        </div>
      </div>

    </MainLayout>
  )
}
