import download from '../../assets/icons/Botón descargar.png'

export const Documentos = () => {
    return (
        <div className='grid grid-cols-2 gap-x-5 gap-y-6 h-fit  '>
            <div className='h-20 rounded-xl p-5 border border-platinum bg-white flex items-center justify-between'>
                <h3 className='font-roboto text-xl text-vivvi font-medium'>Catálogo
                    de materiales</h3>
                <button className='w-8'>
                    <img src={download} alt='download' className='w-full' />
                </button>
            </div>
            <div className='h-20 rounded-xl p-5 border border-platinum bg-white flex items-center justify-between'>
                <h3 className='font-roboto text-xl text-vivvi font-medium'>Paso a paso con Vivvidero</h3>
                <button className='w-8'>
                    <img src={download} alt='download' className='w-full' />
                </button>
            </div>
            <div className='h-20 rounded-xl p-5 border border-platinum bg-white flex items-center justify-between'>
                <h3 className='font-roboto text-xl text-vivvi font-medium'>Información
                    de pago</h3>
                <button className='w-8'>
                    <img src={download} alt='download' className='w-full' />
                </button>
            </div>
        </div>
    )
}
