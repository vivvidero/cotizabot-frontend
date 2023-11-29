import React from 'react'
import { VisOrUsed } from '../../components'
import { Outlet } from 'react-router-dom'

export const MainUpdate = () => {
    return (
        <div className='w-full h-full flex flex-col items-center p-4'>
            <h2 className='text-3xl p-4'>Update Items</h2>
            <VisOrUsed />
            <Outlet />
        </div>

    )
}
