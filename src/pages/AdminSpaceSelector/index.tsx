import { useContext } from "react"
import { MainLayout, MiddleLayout } from "../../Layout"
import { AdminProgressBar } from "../../components"
import { NewProjectContext } from "../../context"

export const AdminSpaceSelector = () => {

    const { newProject } = useContext(NewProjectContext)

    return (
        <MainLayout>
            <AdminProgressBar progress={2} />
            <MiddleLayout>
                <h2 className="font-outfit text-2xl text-vivvi">Selecciona los espacios del proyecto</h2>
                <p> {newProject.name} {" > "} {newProject.tipology.tipologyName} </p>
            </MiddleLayout>

        </MainLayout>
    )
}
