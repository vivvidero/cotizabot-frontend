import { useEffect, useState } from "react"
import { MainLayout, MiddleLayout } from "../../Layout"
import { LinkButton, SummarySpaceSection } from "../../components"
import  { fetchSummary } from "../../api"
import { Summary } from "../../types/Summary"
import { redirect, useParams } from "react-router-dom"

export const SummaryNewProject = () => {

    const [summaryProject, setSummaryProject] = useState<Summary>()

    const { projectid, typologyid } = useParams()

    useEffect(() => {
        if (projectid && typologyid) {
            fetchSummary(projectid, typologyid)
                .then((data) => {
                    setSummaryProject(data.data)
                })
        } else {
            redirect('/admin/projects')
        }
    }, [typologyid, projectid])


    return (
        <MainLayout>
            <MiddleLayout>
                <h2 className="font-outfit text-2xl text-vivvi">Resumen</h2>
                <h3 className='font-outfit text-vivvi text-xl font-light mb-4'>Proyecto: <span className='font-medium'>{summaryProject?.projectname + "  :  Tipologia " + summaryProject?.typologyname}  { } </span> </h3>
                <LinkButton link={`/new-project/${projectid}`} bg="golden" >
                    Volver a Info de proyecto
                </LinkButton>
                {summaryProject?.spaces.map((space) => <SummarySpaceSection key={`${space?.spacetype}${space?.roomnumber}`} space={space} setSummaryProject={setSummaryProject} />)}
            </MiddleLayout>
        </MainLayout>
    )
}
