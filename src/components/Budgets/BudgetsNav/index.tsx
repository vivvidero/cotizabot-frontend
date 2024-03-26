import { NavLink, Outlet, useLocation } from "react-router-dom"
import { LinkButton } from "../.."

export const BudgetsNav = () => {

    const budgetsLinks = ['APUS', 'Referencias', 'Insumos', 'Cáculos de catidades']
    const location = useLocation()

    return (
        <>
            <div className='flex justify-between my-6'>
                <nav>
                    <ul className='flex items-center gap-5 font-roboto text-xl font-normal text-cadet-gray'>
                        {budgetsLinks.map((link) => {
                            return (
                                <NavLink to={link.toLowerCase()} className={({ isActive }) =>
                                    isActive
                                        ? "text-vivvi bg-dorado p-2 rounded font-[500]"
                                        : "text-cadet-gray font-[400]"
                                }> {link} </NavLink>
                            )
                        })}
                    </ul>
                </nav>
                {location.pathname === "/admin/budgets/apus"
                    ?
                    <LinkButton link="apus/create" bg="golden" >
                        Crear APU
                    </LinkButton>
                    : location.pathname === "/admin/budgets/referencias"
                        ?
                        <LinkButton link="apus/new-reference" bg="golden" >
                            Crear Referencia
                        </LinkButton>
                        :
                        <LinkButton link="apus/new-supplie" bg="golden" >
                            Crear Insumo
                        </LinkButton>
                }
            </div>
            <Outlet />
        </>
    )
}
