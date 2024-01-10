import pointMenu from '../../../assets/icons/points.png'

export const AdminProyectItem = () => {
    return (
        <div className='grid grid-cols-12 shadow-lg px-5 py-7 rounded-xl font-roboto text-lg bg-white'>
            <div className='col-span-4'>Mirador</div>
            <div><p>01  </p></div>
            <div><p>C</p></div>
            <div className='col-span-2'><p>Buen Vivir</p></div>
            <div><p>Vis</p></div>
            <div className='col-span-2'><p>27.58</p></div>
            <div className='col-span-1 flex justify-end'>
                <button>
                    <img src={pointMenu} alt='menu' />
                </button>
            </div>
        </div>
    )
}
