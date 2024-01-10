import { MainLayout } from '../../Layout'
import { AdminProgressBar, AdminTipologyCard, LinkButton } from '../../components'

export const AdminTipology = () => {

    const tipologyID = [1, 2, 3, 4, 5]

    return (
        <MainLayout>
            <AdminProgressBar progress={1} />
            <article className='w-full py-12 px-10 flex flex-col justify-center items-start '>
                <h2 className='mb-8 text-3xl text-vivvi font-outfit'>Tipologías</h2>
                <LinkButton link={'new-tipology'} bg={'golden'}>
                    Nueva Tipología
                </LinkButton>
                <div className='mt-20 grid grid-cols-6 gap-5'>
                    {tipologyID.map((tipology) => <AdminTipologyCard tipology={tipology} />)}
                </div>
            </article>
        </MainLayout>
    )
}
