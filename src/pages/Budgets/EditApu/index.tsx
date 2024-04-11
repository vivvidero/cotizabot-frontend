import { MainLayout, MiddleLayout } from "../../../Layout"
import { Outlet } from "react-router-dom"
import { EditApuTabs } from "../../../components/Budgets/ApuTabs/EditApuTabs"



export const EditApu = () => {

    return (
        <MainLayout>
            <MiddleLayout>
                <div className="flex justify-start w-full text-vivvi gap-2">
                    <h2 className="font-outfit text-3xl mx-12">
                        Editar APU
                    </h2>
                </div>
                <EditApuTabs />
                <Outlet />
            </MiddleLayout>
        </MainLayout>
    )
}
