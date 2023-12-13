import React, { useState } from 'react'
import { MainLayout } from '../../Layout'
import arrow from '../../assets/icons/Arrow-Up-green.png'
import { NameQuotationModal, StyleCard } from '../../components'
import minimal from '../../assets/images/cocina.png'
import nordic from '../../assets/images/nordic.png'
import boho from '../../assets/images/boho.png'

export const StyleSelector = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <MainLayout>
            <div className='p-10'>
            <div className='flex relative mb-14'>
                <div className='w-full flex justify-center'>
                    <h2 className='font-outfit text-4xl font-semibold text-vivvi'>Elige tu catálogo favorito</h2>
                </div>
                <div className='absolute right-0'>
                    <button className='flex gap-2 bg-honeydew border border-vivvi rounded-full py-2.5 px-5'>
                        <p>
                            Descubre tu estilo
                        </p>
                        <div>
                            <img src={arrow} alt='arrow'  />
                        </div>
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-5'>
                <StyleCard style='Minimal Black' image={minimal} openModal={openModal} />
                <StyleCard style='Natural Nordic' image={nordic} openModal={openModal} />
                <StyleCard style='Boho Vintage' image={boho} openModal={openModal} />
            </div>
            <NameQuotationModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
            
        </MainLayout>
    )
}
