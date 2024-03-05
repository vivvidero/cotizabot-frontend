import { useContext, useEffect } from 'react'
import { MainLayout } from '../../Layout'
import { AdminProgressBar, AdminTipologyCard, LinkButton, Spinner, TypologiesBoxInfo, UsedComments } from '../../components'
import { NewProjectContext } from '../../context'
import api from '../../api'
import { LoadingContext } from '../../context/LoadingContext'

export const AdminTipology = () => {

    const { newProject, setNewProject } = useContext(NewProjectContext)
    const { loading, setLoading } = useContext(LoadingContext)

    useEffect(() => {
        setLoading(true)
        if (newProject.projectid) {
            try {
                api.get(`/projects/${newProject.projectid}/typologies`)
                    .then((data) => {

                        setNewProject((prevState) => {
                            return {
                                ...prevState,
                                tipologies: data.data,
                                activeTypologyId: undefined
                            }
                        })
                        localStorage.setItem('newProject', JSON.stringify({ ...newProject, activeTypologyId: undefined }))
                        localStorage.removeItem('newProjectSpaces')
                        
                    })
                    .then(() => setLoading(false))
            } catch (error) {
                console.log(error);
            }
        }
        setLoading(false)
    }, [])

    return (
        <MainLayout>
            <AdminProgressBar progress={1} />
            <article className='w-full py-12 px-10 flex flex-col justify-center items-start '>
                <TypologiesBoxInfo />
                <h2 className='my-4 text-3xl text-vivvi font-outfit'>Tipologías</h2>
                <LinkButton link={'new-tipology'} bg={'golden'}>
                    Nueva Tipología
                </LinkButton>
                <div className='mt-6 grid grid-cols-5 gap-5 w-full'>
                    {loading
                        ?
                        <Spinner />
                        :
                        newProject?.tipologies
                            ?
                            newProject?.tipologies?.length > 0
                                ?
                                newProject?.tipologies.map((typology, index) => <AdminTipologyCard key={index} typology={typology} />)
                                :
                                <p className='text-3xl text-vivvi'>No hay tipologias aun!</p>
                            :
                            null
                    }
                </div>
                {
                    newProject.type === "Usado"
                    &&
                    <UsedComments />
                }

            </article>
        </MainLayout>
    )
}
