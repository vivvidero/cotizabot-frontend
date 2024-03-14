import { useContext, useEffect, useState } from "react"
import { MainLayout, MiddleLayout } from "../../Layout"
import { NewProjectContext } from "../../context"
import { LinkButton, SummarySpaceSection } from "../../components"
import api from "../../api"
import { Summary } from "../../types/Summary"
import {  useParams } from "react-router-dom"

export const SummaryNewProject = () => {

    const { newProject } = useContext(NewProjectContext)
    const [summaryProject, setSummaryProject] = useState<Summary>()

    const { projectid, typologyid } = useParams()

    useEffect(() => {
        const newProjectStorage = localStorage.getItem('newProject')
        if (newProjectStorage) {
            /* const newProjectParsed = JSON.parse(newProjectStorage) */
            api.get(`/projects/${projectid}/typologies/${typologyid}/spaces`)
                .then((data) => {
                    setSummaryProject(data.data)
                    localStorage.setItem('newProject', JSON.stringify({ ...newProject, activeTypologyId: newProject?.activeTypologyId }))
                })
        }
    }, [typologyid, projectid])

    console.log(summaryProject);
    

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
