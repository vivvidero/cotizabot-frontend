import { useNavigate } from 'react-router-dom'
import apu from '../../../assets/images/apu-placeholder.png'

export const AdminApuCard = () => {

    const navigate = useNavigate()

    const handleEdit = () => {
        navigate('edit')
    }

    return (
        <div className="flex rounded-lg bg-white p-2 gap-6" style={{ boxShadow: '0px 4px 6px 0px rgba(195, 195, 195, 0.25)' }}>
            <div>
                <img src={apu} alt="apu" />
            </div>
            <div className="flex flex-col items-center justify-around">
                <h5 className='font-roboto font-[400]'>Piso cerámico</h5>
                <button className='border border-vivvi rounded-full w-28 h-6 flex items-center justify-center' onClick={handleEdit}>Editar</button>
            </div>
        </div>
    )
}
