import whiteArrow from '../../assets/icons/Arrow---Up.png'
import { BotonVerde } from "../ui"
import { Cotizacion } from '.'

export const MisCotizaciones = () => {
    return (
        <div className='shadow-lg'>
            <div className='px-9 py-6 bg-anti-flash font-outfit text-2xl font-medium'>
                <h3>Mis cotizaciones</h3>
            </div>
            <Cotizacion />
            <Cotizacion />
            <div className='grid place-content-center pt-16 pb-5'>
                <BotonVerde link={'/dashboard/1'}>
                    <p>Crear cotización</p>
                    <img src={whiteArrow} alt='arrow' />
                </BotonVerde>
            </div>

        </div>
    )
}
