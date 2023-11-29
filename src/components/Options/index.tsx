import React from 'react'
import kitchen from "../../assets/icons/kitchen_1606657.png"

export const Options = () => {

    const options: string[] = ["Mi vivvi", "Documentación", "Planos", "Contrato", "Presupuesto", "Que incluye","Avance de obra", "Cronograma", "Contacto", "Referidos"]


    return (
        <div className='p-4'>
            <h2 className='text-4xl text-center'>No matter the scope, you can start building today.</h2>
            <div className=' flex my-8 flex-wrap'>

                {options.map((option) => {
                    return (
                        <div className='flex flex-col justify-evenly items-center bg-red-50 rounded-xl w-40 h-40 m-2 hover:border-2 hover:border-orange-600 hover:bg-pink-50 hover:cursor-pointer'>
                            <img src={kitchen} />
                            <h3 className='text-lg'> {option} </h3>
                        </div>
                    )
                })}


            </div>
        </div>

    )
}
