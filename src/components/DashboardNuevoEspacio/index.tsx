import { Link } from 'react-router-dom'
import plus from '../../assets/icons/Plus.png'

export const DashboardNuevoEspacio = () => {
    return (
        <article className="rounded grid place-content-center bg-anti-flash border border-platinum">
            <Link to={'/dashboard/1'} className='flex justify-center'>
                <img src={plus} alt='plus' />
            </Link>
            <p>Agregar espacio</p>
        </article>
    )
}
