import download from '../../assets/icons/download.png'
import document from '../../assets/icons/Document.png'

export const Documentos = () => {
    return (
        <div className='shadow-lg'>
            <div className='px-9 py-6  bg-anti-flash font-outfit text-2xl font-medium'>
                <h3>Documentos</h3>
            </div>
            <div className='px-9 py-6 font-outfit text-lg font-medium'>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2'>
                        <img src={document} alt='document' />
                        <h3>Presentación de diseño</h3>
                    </div>
                    <div>
                        <img src={download} alt='arrow' />
                    </div>
                </div>
            </div>
            <hr />
            <div className='px-9 py-6 font-outfit text-lg font-medium'>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2'>
                        <img src={document} alt='document' />
                        <h3>Contrato</h3>
                    </div>
                    <div>
                        <img src={download} alt='arrow' />
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}
