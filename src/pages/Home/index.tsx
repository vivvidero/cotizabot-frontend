import { MainLayout } from '../../Layout'
import homeImage1 from '../../assets/images/Rectangle 205.png'
import homeImage2 from '../../assets/images/Rectangle 206.png'
import { Documentos, HomeImageCard, MisCotizaciones } from '../../components'

export const Home = () => {
    return (
        <MainLayout>
            <div className='grid gap-10'>
                <div className='grid grid-cols-2 gap-5'>
                    <HomeImageCard cardImage={homeImage1} linkText='Descubre tu estilo' />
                    <HomeImageCard cardImage={homeImage2} linkText='Casos de éxito' />
                </div>
                <div className='grid grid-cols-2 gap-5 h-fit'>
                    <MisCotizaciones />
                    <Documentos />
                </div>
            </div>
        </MainLayout>

    )
}
