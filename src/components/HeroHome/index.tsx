import { LinkButton } from '..'
import search from '../../assets/icons/Search.png'
import './heroHome.css'

export const HeroHome = () => {
    return (
        <div className='bg-home flex items-center flex-col justify-end p-9 gap-5 text-white'>
            <h3 className='font-outfit text-5xl '>Hola, Valeria</h3>
            <p className='text-lg font-roboto'>Descubre nuestros estilos y materiales, e inspírate para tu remodelación</p>
            <LinkButton link='/dashboard' bg='golden'>
                <div className='flex px-12 gap-2'>
                    <p>Explorar</p>
                    <div className='flex items-center'>
                        <img src={search} alt='' />
                    </div>
                </div>
            </LinkButton>
        </div>
    )
}
