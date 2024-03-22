import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { MainLayout } from '../../Layout'

export const Admin = () => {

    const location = useLocation()
    const isActiveLink = location.pathname.split('/')[2]

    return (
        <MainLayout>
            <div className='px-10 py-16 bg-snow '>
                <nav>
                    <ul className='flex gap-4 font-outfit text-2xl'>
                        <NavLink className={isActiveLink === 'projects' ? "text-vivvi font-[500] underline"
                                : "text-silver font-[300]"
                        } to={'/admin/projects'}>Proyectos</NavLink>
                        <hr />
                        <NavLink className={isActiveLink === 'budgets' ? "text-vivvi font-[500] underline"
                                : "text-silver font-[300]"
                        } to={'/admin/budgets/apus'}>Presupuestos</NavLink>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </MainLayout>
    )
}
