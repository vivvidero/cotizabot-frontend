import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './context'

export const ProtectedRoutes = () => {

    const {  token } = useContext(AuthContext)

    if (!token) return <Navigate to={'/'} replace />


    return (
        <Outlet />
    )
}
