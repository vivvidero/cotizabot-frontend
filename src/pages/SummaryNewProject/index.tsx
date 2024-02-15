import { useContext } from "react"
import { MainLayout, MiddleLayout } from "../../Layout"
import { NewProjectContext } from "../../context"
import { SummarySpaceSection } from "../../components"

export const SummaryNewProject = () => {

    const { newProject } = useContext(NewProjectContext)

    return (
        <MainLayout>
            <MiddleLayout>
                <h2 className="font-outfit text-2xl text-vivvi">Resumen</h2>
                <h3 className='font-outfit text-vivvi text-xl font-light'>Proyecto: <span className='font-medium'>{newProject.projectname}</span> </h3>
                <SummarySpaceSection space={"Cocina"} />
                <SummarySpaceSection space={"Ropas"}/>
                <SummarySpaceSection space={"Baño (con ducha)"}/>
            </MiddleLayout>

        </MainLayout>
    )
}
