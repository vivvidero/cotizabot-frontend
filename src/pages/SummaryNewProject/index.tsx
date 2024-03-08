import { useContext, useEffect, useState } from "react"
import { MainLayout, MiddleLayout } from "../../Layout"
import { NewProjectContext } from "../../context"
import { LinkButton, SummarySpaceSection } from "../../components"
import api from "../../api"
import { Summary } from "../../types/Summary"
import { useNavigate } from "react-router-dom"

export const SummaryNewProject = () => {

    const { newProject } = useContext(NewProjectContext)
    const [summaryProject, setSummaryProject] = useState<Summary>()
    const navigate = useNavigate()

    useEffect(() => {
        const newProjectStorage = localStorage.getItem('newProject')

        if (newProjectStorage) {
            const newProjectParsed = JSON.parse(newProjectStorage)
            if (!newProjectParsed?.projectid || !newProjectParsed.activeTypologyId) {
                return navigate('/new-project/tipology')
            }
            api.get(`/projects/${newProject?.projectid}/typologies/${newProject?.activeTypologyId}/spaces`)
                .then((data) => {
                    setSummaryProject(data.data)
                    localStorage.setItem('newProject', JSON.stringify({ ...newProject, activeTypologyId: newProject?.activeTypologyId }))
                })
        }
    }, [newProject.activeTypologyId, newProject?.projectid])

    return (
        <MainLayout>
            <MiddleLayout>
                <h2 className="font-outfit text-2xl text-vivvi">Resumen</h2>

                <h3 className='font-outfit text-vivvi text-xl font-light mb-4'>Proyecto: <span className='font-medium'>{summaryProject?.projectname + "  :  Tipologia " + summaryProject?.typologyname}  { } </span> </h3>
                <LinkButton link="/new-project/tipology" bg="golden" >
                    Volver a Info de proyecto
                </LinkButton>
                {summaryProject?.spaces.map((space) => <SummarySpaceSection key={`${space?.spacetype}${space?.roomnumber}`} space={space} setSummaryProject={setSummaryProject} />)}
            </MiddleLayout>
        </MainLayout>
    )
}
