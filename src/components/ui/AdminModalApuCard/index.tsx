import apu from '../../../assets/images/apu-placeholder.png'

export const AdminModalApuCard = () => {
    return (
        <div className="flex flex-col justify-between items-center rounded-lg bg-white p-2 gap-6" style={{ boxShadow: '0px 4px 6px 0px rgba(195, 195, 195, 0.25)' }}>
            <div className='w-full'>
                <img src={apu} alt="apu" className='w-full' />
            <h5 className='font-roboto font-[400] text-center mt-2'>Piso cerámico</h5>
            </div>
            <div className="flex flex-col items-center justify-around">
                <button className='border border-vivvi rounded-full w-36 h-8 flex items-center justify-center'>Seleccionar</button>
            </div>
        </div>
    )
}
