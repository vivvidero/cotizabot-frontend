import { useContext, useEffect, useState } from "react"
import { MainLayout, MiddleLayout } from "../../Layout"
import { NewProjectContext } from "../../context"
import { LinkButton, SummarySpaceSection } from "../../components"
import api from "../../api"
import { Summary } from "../../types/Summary"

export const SummaryNewProject = () => {

    const { newProject } = useContext(NewProjectContext)
    const [summaryProject, setSummaryProject] = useState<Summary>()

    useEffect(() => {

        if (!newProject?.projectid || !newProject.activeTypologyId) {
            return
        }

        api.get(`/projects/${newProject?.projectid}/typologies/${newProject.activeTypologyId}/spaces`)
            .then((data) => {
                console.log(data.data);

                setSummaryProject(data.data)
            })
    }, [newProject.activeTypologyId, newProject?.projectid])

    console.log(summaryProject);



    return (
        <MainLayout>
            <MiddleLayout>
                <h2 className="font-outfit text-2xl text-vivvi">Resumen</h2>
                <h3 className='font-outfit text-vivvi text-xl font-light mb-4'>Proyecto: <span className='font-medium'>{summaryProject?.projectname + "  >  Tipologia " + summaryProject?.typologyname}  { } </span> </h3>
                <LinkButton link="/new-project/tipology" bg="golden" >
                    Volver a Info de proyecto
                </LinkButton>
                {summaryProject?.spaces.map((space) => <SummarySpaceSection key={`${space?.spacetype}${space?.roomnumber}`} space={space} />)}
            </MiddleLayout>

        </MainLayout>
    )
}
