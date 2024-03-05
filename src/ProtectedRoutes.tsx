import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './context'

export const ProtectedRoutes = () => {

    const {  isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) return <Navigate to={'/'} replace />


    return (
        <Outlet />
    )
}
