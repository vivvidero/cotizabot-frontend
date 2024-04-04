import { useContext, useEffect, useState } from 'react'
import { MainLayout } from '../../../Layout'
import { AdminProgressBar, LinkButton, ProjectBoxInfo, Spinner, TipologyCard, UsedComments } from '../../../components'
import { LoadingContext } from '../../../context/LoadingContext'
import { useParams } from 'react-router-dom'
import { fetchProjectById, fetchTypologiesByProjectId } from '../../../api/projects'
import noTypologies from '../../../assets/images/noprojects.png'


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

export const Tipologies = () => {

    const { loading, setLoading } = useContext(LoadingContext);
    const [typologies, setTypologies] = useState<TypologiesData[]>([]);
    const [infoProject, setInfoProject] = useState<InfoProject>();
    const { projectid } = useParams();

    useEffect(() => {
        setLoading(true);
        if (projectid) {
            try {
                fetchTypologiesByProjectId(projectid)
                    .then((data) => {
                        setTypologies(data.data);
                        fetchProjectById(projectid)
                            .then((data) => setInfoProject(data.data.project))
                            .then(() => setLoading(false));
                    })
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }, [projectid, setLoading]);

    return (
        <MainLayout>
            <AdminProgressBar progress={1} />
            <article className='w-full py-12 px-10 flex flex-col justify-center items-start '>
                <ProjectBoxInfo infoProject={infoProject} />
                <h2 className='my-4 text-3xl text-vivvi font-outfit'>Tipologías</h2>
                <LinkButton link={'new-tipology'} bg={'golden'}>
                    Nueva Tipología
                </LinkButton>
                <div className='mt-6 grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 w-full'>
                    {loading ? (
                        <Spinner />
                    ) : typologies ? (
                        typologies.length > 0 ? (
                            typologies.map((typology, index) => (
                                <TipologyCard key={index} typology={typology} setTypologies={setTypologies} />
                            ))
                        ) : (
                            <div className="w-full m-auto border border-platinum rounded-lg bg-white flex flex-col items-center justify-center gap-6 p-6">
                                <img className="w-1/4" src={noTypologies} alt="sin proyectos" />
                                <h3 className="text-2xl font-semibold">No tienes tipologías creadas aún</h3>
                            </div>
                        )
                    ) : null}
                </div>
                {
                    infoProject?.type === "Usado" && <UsedComments />
                }
            </article>
        </MainLayout>
    );
};