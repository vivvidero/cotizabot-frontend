import { useContext, useEffect, useState } from 'react'
import { MainLayout } from '../../Layout'
import { AdminProgressBar, AdminTipologyCard, LinkButton, Spinner, TypologiesBoxInfo, UsedComments } from '../../components'
import { LoadingContext } from '../../context/LoadingContext'
import { useParams } from 'react-router-dom'
import api from '../../api'


interface TypologiesData {
    typologyid: number;
    projectid: number;
    typologyname: string;
    type: string;
    privatearea: number;
    builtarea: number;
    image: string;
    linkpdf: string;
    linkdocument: string;
    linkvideo: string;
}

interface InfoProject {
    projectid: number;
    projectname: string;
    constructorname: string;
    city: string;
    neighborhood: string;
    address: string;
    type: string;
}

export const AdminTipology = () => {

    const { loading, setLoading } = useContext(LoadingContext)
    const [typologies, setTypologies] = useState<TypologiesData[]>([])
    const [infoProject, setInfoProject] = useState<InfoProject>()
    const { projectid } = useParams()

    useEffect(() => {
        setLoading(true)
        if (projectid) {
            try {
                api.get<TypologiesData[]>(`/projects/${projectid}/typologies`)
                    .then((data) => {
                        setTypologies(data.data)
                        api.get(`/proyectos/${projectid}`)
                            .then((data) => setInfoProject(data.data.project))
                            .then(() => setLoading(false))
                    })
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
    }, [projectid, setLoading])

    return (
        <MainLayout>
            <AdminProgressBar progress={1} />
            <article className='w-full py-12 px-10 flex flex-col justify-center items-start '>
                <TypologiesBoxInfo infoProject={infoProject} />
                <h2 className='my-4 text-3xl text-vivvi font-outfit'>Tipologías</h2>
                <LinkButton link={'new-tipology'} bg={'golden'}>
                    Nueva Tipología
                </LinkButton>
                <div className='mt-6 grid grid-cols-5 gap-5 w-full'>
                    {loading
                        ?
                        <Spinner />
                        :
                        typologies
                            ?
                            typologies?.length > 0
                                ?
                                typologies.map((typology, index) => <AdminTipologyCard key={index} typology={typology} setTypologies={setTypologies} />)
                                :
                                <p className='text-3xl text-vivvi'>No hay tipologias aun!</p>
                            :
                            null
                    }
                </div>
                {
                    infoProject?.type === "Usado"
                    &&
                    <UsedComments />
                }
            </article>
        </MainLayout>
    )
}
