import { MainLayout, MiddleLayout } from "../../../../Layout"
import { Outlet } from "react-router-dom"
import { ApuTabs } from "../../../../components/Budgets/ApuTabs"



export const NewApu = () => {



  return (
    <MainLayout>
      <MiddleLayout>
        <div className="flex justify-start w-full text-vivvi gap-2">
          <h2 className="font-outfit text-3xl mx-12">
            Nuevo APU
          </h2>
        </div>

        <ApuTabs />

        <Outlet />

      </MiddleLayout>
    </MainLayout>
  )
}
