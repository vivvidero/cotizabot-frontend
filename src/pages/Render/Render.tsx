import React, { useState } from 'react'
import cocina from '../../assets/images/Kitchen.jpg'
import cocinaColoreada from '../../assets/images/Kitchen-coloring.jpg'
import cocinaroja from '../../assets/images/Kitchen-red.jpg'

export const Render = () => {

    const [image, setImage] = useState(cocina);
    return (
        <div className='flex gap-12 items-center justify-center'>

            <div className='w-96 relative'>
                <img className='w-full z-0 absolute' src={cocina} />
                <img className='w-full z-10 absolute' src={image} />

            </div>
            <div className='flex flex-col gap-4'>
                <button className='bg-white p-2 rounded' onClick={() => setImage(cocina)}>Sin color</button>
                <button className='bg-white p-2 rounded' onClick={() => setImage(cocinaColoreada)}> Azul </button>
                <button className='bg-white p-2 rounded' onClick={() => setImage(cocinaroja)}>Roja</button>
            </div>
        </div>
    )
}
