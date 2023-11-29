import React from 'react'
import { Outlet } from 'react-router-dom'
import { VisOrUsed } from '../../components'

export const MainCreate = () => {
    return (
        <div className='w-full h-full flex flex-col gap-8 items-center p-4'>
            <h2>Crear Items</h2>

            <VisOrUsed />

            <Outlet />
        </div>
    )
}
