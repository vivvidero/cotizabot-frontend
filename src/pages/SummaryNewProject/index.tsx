import { useContext, useEffect, useState } from "react"
import { MainLayout, MiddleLayout } from "../../Layout"
import { NewProjectContext } from "../../context"
import { SummarySpaceSection } from "../../components"
import api from "../../api"
import { Spaces } from "../../types/Spaces"


interface Summary {
    "address": string
    "builtarea": number,
    "city": string,
    "constructorname": string,
    "neighborhood": string,
    "privatearea": number,
    "projectname": string,
    "projecttype": string
    spaces: Spaces[]
    typologyid: number,
    typologyimage: File | null,
    typologytype: string,
    typologyname: string
}



export const SummaryNewProject = () => {

    const { newProject } = useContext(NewProjectContext)

    const [summaryProject, setSummaryProject] = useState<Summary>()

    useEffect(() => {
        api.get(`/projects/:projectId/typologies/${newProject.activeTypologyId}/spaces`)
            .then((data) => setSummaryProject(data.data))
    }, [newProject.activeTypologyId])


    console.log(summaryProject);
    

    return (
        <MainLayout>
            <MiddleLayout>
                <h2 className="font-outfit text-2xl text-vivvi">Resumen</h2>
                <h3 className='font-outfit text-vivvi text-xl font-light'>Proyecto: <span className='font-medium'>{summaryProject?.projectname + "  >  Tipologia " + summaryProject?.typologyname}  {} </span> </h3>
                {summaryProject?.spaces.map((space) => <SummarySpaceSection space={space}  /> )}
                {/* <SummarySpaceSection space={"Cocina"} />
                <SummarySpaceSection space={"Ropas"} />
                <SummarySpaceSection space={"Baño (con ducha)"} /> */}
            </MiddleLayout>

        </MainLayout>
    )
}
