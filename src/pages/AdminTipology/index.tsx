import { useContext } from 'react'
import { MainLayout } from '../../Layout'
import { AdminProgressBar, AdminTipologyCard, LinkButton } from '../../components'
import { NewProjectContext } from '../../context'
import { Link } from 'react-router-dom'

export const AdminTipology = () => {

    const { newProject } = useContext(NewProjectContext)
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
                    {newProject.tipologies.length > 0
                        ?
                        newProject.tipologies.map((tipology, index) => <AdminTipologyCard key={index} tipology={tipology} />)
                        :
                        <p className='text-3xl text-vivvi'>No hay tipologias aun!</p>
                    }
                </div>
                <div className='flex gap-4 mt-8'>
                    <LinkButton link={'/new-project/space-selector'} bg={'golden'}>
                        Guardar
                    </LinkButton >
                    <Link to={"/admin"} className='grid place-content-center px-5 border border-vivvi rounded-full'>
                        Cancelar
                    </Link >
                </div>
            </article>
        </MainLayout>
    )
}
