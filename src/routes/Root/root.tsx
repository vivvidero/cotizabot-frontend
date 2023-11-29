import { Link } from "react-router-dom"

export const Sidebar = () => {
    return (
        <aside className="w-1/5 bg-green-300">
            <nav>
                <ul className="flex flex-col items-center p-4 gap-6">
                    <li>
                        <Link to={'create-items'}>Crear Items </Link>
                    </li>
                    <li>
                        <Link to={'update-items'} > Actualizar Items</Link>
                    </li>
                    <li>
                        <Link to={'render'} > Render</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
