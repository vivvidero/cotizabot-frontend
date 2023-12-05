import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './context'

export const ProtectedRoutes = () => {

    const { token, isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) return <Navigate to={'/login'} replace />


    return (
        <Outlet />
    )
}
