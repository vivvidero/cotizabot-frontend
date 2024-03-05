import { useContext, useEffect, useState } from "react"
import { MainLayout, MiddleLayout } from "../../Layout"
import { NewProjectContext } from "../../context"
import { SummarySpaceSection } from "../../components"
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

                /* // Objeto para almacenar la fusión
                const mergedObjects: { [key: string]: { spacetype: string; roomnumber: number; typologies: Summary[] } } = {};
                // Fusionar objetos con la misma spacetype y roomnumber
                data.data.spaces.forEach((obj: any) => {
                    console.log(obj);

                    const key = obj.spacetype + '_' + obj.roomnumber;
                    if (!mergedObjects[key]) {
                        mergedObjects[key] = { spacetype: obj.spacetype, roomnumber: obj.roomnumber, typologies: [] };
                    }
                    // Crear un objeto typology sin spacetype y roomnumber
                    const typology = {};
                    for (const prop in obj) {
                        if (prop !== 'spacetype' && prop !== 'roomnumber') {
                            typology[prop] = obj[prop];
                        }
                    }
                    mergedObjects[key].typologies.push(typology);
                });

                setSummaryProject({
                    projectData: data.data,
                    spaces: Object.values(mergedObjects)
                }) */
            })
    }, [newProject.activeTypologyId, newProject?.projectid])

    console.log(summaryProject);



    return (
        <MainLayout>
            <MiddleLayout>
                <h2 className="font-outfit text-2xl text-vivvi">Resumen</h2>
                <h3 className='font-outfit text-vivvi text-xl font-light'>Proyecto: <span className='font-medium'>{summaryProject?.projectname + "  >  Tipologia " + summaryProject?.typologyname}  { } </span> </h3>
                {summaryProject?.spaces.map((space) => <SummarySpaceSection key={`${space?.spacetype}${space?.roomnumber}`} space={space} />)}
                {/* <SummarySpaceSection space={"Cocina"} />
                <SummarySpaceSection space={"Ropas"} />
                <SummarySpaceSection space={"Baño (con ducha)"} /> */}
            </MiddleLayout>

        </MainLayout>
    )
}
