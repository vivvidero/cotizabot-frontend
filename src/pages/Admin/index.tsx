import React from 'react'
import { MainLayout } from '../../Layout'
import burger from '../../assets/icons/Menú.png'

export const Admin = () => {
    return (
        <MainLayout>
            <div className='px-10 py-16 bg-white h-screen'>
                <nav>
                    <ul className='flex gap-4 font-outfit text-2xl font-light'>
                        <li>Proyectos</li>
                        <li>Presupuestos</li>
                    </ul>
                </nav>
                <div className='flex justify-between my-6'>
                    <button className='bg-blue-700 p-2 rounded-full text-white'>
                        Nuevo Proyecto
                    </button>

                    <select className='border border-blue-700 rounded-full text-blue-700'>
                        <option>VIS</option>
                        <option>Usado</option>
                    </select>
                </div>

                <section className='flex flex-col gap-4'>
                    <div className='grid grid-cols-12 px-5 py-7'>
                        <div className='col-span-4'></div>
                        <div><p>Número</p></div>
                        <div><p>Tipo</p></div>
                        <div className='col-span-2'><p>Constructora</p></div>
                        <div><p>Vivienda</p></div>
                        <div className='col-span-2'><p>Área Construida</p></div>
                        <div className='col-span-1'></div>
                    </div>
                    <div className='grid grid-cols-12 shadow-lg px-5 py-7 rounded-xl font-roboto text-lg '>
                        <div className='col-span-4'>Mirador</div>
                        <div><p>01  </p></div>
                        <div><p>C</p></div>
                        <div className='col-span-2'><p>Buen Vivir</p></div>
                        <div><p>Vis</p></div>
                        <div className='col-span-2'><p>27.58</p></div>
                        <div className='col-span-1 flex justify-end'>
                            <button>
                                <img src={burger} alt='menu' />
                            </button>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 shadow-lg px-5 py-7 rounded-xl font-roboto text-lg '>
                        <div className='col-span-4'>Mirador</div>
                        <div><p>01  </p></div>
                        <div><p>C</p></div>
                        <div className='col-span-2'><p>Buen Vivir</p></div>
                        <div><p>Vis</p></div>
                        <div className='col-span-2'><p>27.58</p></div>
                        <div className='col-span-1 flex justify-end'>
                            <button>
                                <img src={burger} alt='menu' />
                            </button>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 shadow-lg px-5 py-7 rounded-xl font-roboto text-lg '>
                        <div className='col-span-4'>Mirador</div>
                        <div><p>01  </p></div>
                        <div><p>C</p></div>
                        <div className='col-span-2'><p>Buen Vivir</p></div>
                        <div><p>Vis</p></div>
                        <div className='col-span-2'><p>27.58</p></div>
                        <div className='col-span-1 flex justify-end'>
                            <button>
                                <img src={burger} alt='menu' />
                            </button>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 shadow-lg px-5 py-7 rounded-xl font-roboto text-lg '>
                        <div className='col-span-4'>Mirador</div>
                        <div><p>01  </p></div>
                        <div><p>C</p></div>
                        <div className='col-span-2'><p>Buen Vivir</p></div>
                        <div><p>Vis</p></div>
                        <div className='col-span-2'><p>27.58</p></div>
                        <div className='col-span-1 flex justify-end'>
                            <button>
                                <img src={burger} alt='menu' />
                            </button>
                        </div>
                    </div>
                    



                </section>
            </div>
        </MainLayout>
    )
}
