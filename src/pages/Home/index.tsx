import homeimage from '../../assets/images/inspiracion.png'
import { HomeCard } from '../../components'

export const Home = () => {
    return (
        <div className='p-0 h-full grid grid-rows-2 gap-5'>
            <div className="gap-5 flex">
                <div className='w-7/12 relative'>
                    <HomeCard cardImage={homeimage} linkText={'Inspiración'} />
                </div>
                <div className='w-5/12 relative'>
                    <HomeCard cardImage={homeimage} linkText={'Casos de éxito'} />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div className='relative'>
                    <HomeCard cardImage={homeimage} linkText={'Crear cotización'} />
                </div>
                <div className='relative'>
                    <HomeCard cardImage={homeimage} linkText={'Mis cotización'} />
                </div>
                <div className='relative'>
                    <HomeCard cardImage={homeimage} linkText={'Mis documentos'} />
                </div>
            </div>
        </div>
    )
}
