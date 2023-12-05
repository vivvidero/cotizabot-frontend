import document from '../../assets/icons/Document.png'
import arrow from '../../assets/icons/Arrow---Right.png'

export const Cotizacion = () => {
    return (
        <>
            <div className='px-9 py-6 font-outfit text-lg font-medium'>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2'>
                        <img src={document} alt='document' />
                        <h3>Mi casita 01</h3>
                    </div>
                    <div>
                        <img src={arrow} alt='arrow' />
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}
