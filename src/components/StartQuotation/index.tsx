import { LinkButton } from '..'
import image from '../../assets/images/startQuot.png'
import arrow from '../../assets/icons/Arrow-Up-green.png'

export const StartQuotation = () => {
  return (
    <div className='rounded-lg overflow-hidden'>
      <div>
        <img src={image} alt='card-image' className='w-full'/>
      </div>
      <div className='bg-white flex items-center justify-between p-7'>
        <h3 className='font-outfit text-vivvi text-3xl'>
          Inicia tu cotización
        </h3>
        <LinkButton link='/property-type' bg='golden'>
          <p>
            Crear cotización
          </p>
          <img src={arrow} alt='arrow' />
        </LinkButton>
      </div>
    </div>
  )
}
