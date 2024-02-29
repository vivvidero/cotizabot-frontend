import { useContext, useEffect } from 'react'
import { MainLayout } from '../../Layout'
import { AdminProgressBar, AdminTipologyCard, LinkButton, Spinner } from '../../components'
import { NewProjectContext } from '../../context'
import api from '../../api'
import UseLocalStorage from '../../hooks/useLocalStorage'
import { LoadingContext } from '../../context/LoadingContext'

export const AdminTipology = () => {

    const { newProject, setNewProject } = useContext(NewProjectContext)
    const [project, updateProject] = UseLocalStorage('newProject')
    const [spacesSelected, updateSpacesSelected, removeSpaces] = UseLocalStorage('newProjectSpaces')
    const { loading, setLoading } = useContext(LoadingContext)

    useEffect(() => {
        setLoading(true)
        try {
            api.get(`/projects/${project.projectId}/typologies`)
                .then((data) => {
                    console.log(data.data);
                    setNewProject((prevState) => {
                        return {
                            ...prevState,
                            tipologies: data.data,
                            activeTypologyId: undefined
                        }
                    })
                    updateProject({ ...newProject, activeTypologyId: undefined })
                    removeSpaces()
                })

                .then(() => setLoading(false))
        } catch (error) {
            console.log(error);

        }
        setLoading(false)

    }, [])


    return (
        <MainLayout>
            <AdminProgressBar progress={1} />
            <article className='w-full py-12 px-10 flex flex-col justify-center items-start '>
                <h3 className='font-outfit text-vivvi text-xl font-light'>Proyecto: <span className='font-medium'>{newProject.projectName}</span> </h3>
                <h2 className='my-8 text-3xl text-vivvi font-outfit'>Tipologías</h2>
                <LinkButton link={'new-tipology'} bg={'golden'}>
                    Nueva Tipología
                </LinkButton>
                <div className='mt-20 grid grid-cols-6 gap-5'>
                    {newProject?.tipologies
                        ?
                        newProject?.tipologies.map((typology, index) => <AdminTipologyCard key={index} typology={typology} />)
                        :
                        loading
                            ?
                            <Spinner />
                            :
                            <p className='text-3xl text-vivvi'>No hay tipologias aun!</p>
                    }
                </div>
                <div className='flex gap-4 mt-8'>
                    {/*  <LinkButton link={'/new-project/space-selector'} bg={'golden'}>
                        Guardar
                    </LinkButton > */}
                    <LinkButton link={'admin'} bg={''} >
                        Cancelar
                    </LinkButton>

                </div>
            </article>
        </MainLayout>
    )
}
