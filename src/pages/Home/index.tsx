import { MainLayout } from '../../Layout'
import { Documentos, HeroHome, StartQuotation } from '../../components'

export const Home = () => {


    
    return (
        <MainLayout>
            <div className='grid gap-10'>
                {/*  <HomeImageCard cardImage={homeImage1} linkText='Descubre tu estilo' />
                    <HomeImageCard cardImage={homeImage2} linkText='Casos de éxito' /> */}
                <HeroHome />
                <div className='grid grid-cols-2 gap-24 h-fit py-16 px-36'>
                    {/* <MisCotizaciones /> */}
                    <StartQuotation />
                    <Documentos />
                </div>
            </div>
        </MainLayout>

    )
}
