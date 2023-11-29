import React from 'react'
import { Link } from 'react-router-dom'
import { RoomAdds } from '..'

export const RoomPicker = () => {
    return (
        <div className='w-full flex flex-col items-center h-full'>
            <h2 className='m-4 text-xl'>
                Elegir Espacio
            </h2>
            <div className='w-full flex justify-between h-1/2'>

                <aside className='w-1/3'>
                    <ul className='flex flex-col gap-4'>
                        <Link to={''} >Cocina</Link>
                        <Link to={''} >Baño</Link>
                        <Link to={''} >Habitacion</Link>
                        <Link to={''} >Comedor</Link>
                        <Link to={''} >Cuato aseo</Link>
                    </ul>
                </aside>
                <div className='w-2/3 bg-white'>
                    <img />
                    INSERTE IMAGEN
                </div>
            </div>
            <RoomAdds />
        </div>
    )
}
