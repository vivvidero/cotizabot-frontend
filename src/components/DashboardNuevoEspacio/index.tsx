import { Link } from 'react-router-dom'
import plus from '../../assets/icons/Plus.png'

export const DashboardNuevoEspacio = () => {
    return (
        <article className="rounded-md flex p-4 bg-white gap-10 border-platinum h-96">
            <div className='w-1/3 flex flex-col justify-center items-center bg-platinum rounded-lg'>
                <Link to={'/dashboard/1'} className='flex justify-center'>
                    <img src={plus} alt='plus' />
                </Link>
                <p>Agregar espacio</p>
            </div>
            <div className='w-2/3'>
            </div>
        </article>
    )
}
