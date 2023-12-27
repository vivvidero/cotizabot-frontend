import  { FC } from 'react';
import close from '../../../assets/icons/close.png'
import trash from '../../../assets/icons/Delete.png'
import item from '../../../assets/images/item.png'

import './canvasItems.css';

interface OffCanvasProps {
    isOpen: boolean;
    onClose: () => void;

}


export const CanvasItems: FC<OffCanvasProps> = ({ isOpen, onClose }) => {

    return (
        <div className={`off-canvas ${isOpen ? 'open' : ''}`}>
            {isOpen && <div className="overlay" onClick={onClose}></div>}
            <div className="canvas flex flex-col justify-between py-20  ">
                <div>
                    <div className='flex justify-between mb-14  '>
                        <h3 className='font-roboto text-vivvi text-2xl'>
                            Has agregado los siguientes items a ILUMINACIÓN
                        </h3>
                        <button className="m-4" onClick={onClose}>
                            <img src={close} alt='close' />
                        </button>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex'>
                            <div>
                                <img src={item} alt='item' />
                            </div>
                            <div className='flex flex-col justify-evenly font-roboto '>
                                <div>
                                    <h4 className='text-xl'>Bala de techo LED de 9W</h4>
                                </div>
                                <div>
                                    <p className='text-lg'>$450.000</p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <div className='rounded flex p-2 gap-3' style={{ backgroundColor: '#F1F1F1' }}>
                                        <button className='px-3'>-</button>
                                        <p >5</p>
                                        <button className='px-3'>+</button>
                                    </div>
                                    <button className='rounded flex p-2' style={{ backgroundColor: '#F1F1F1' }}>
                                        <img src={trash} alt='delete' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <img src={item} alt='item' />
                            </div>
                            <div className='flex flex-col justify-evenly font-roboto '>
                                <div>
                                    <h4 className='text-xl'>Bala de techo LED de 9W</h4>
                                </div>
                                <div>
                                    <p className='text-lg'>$450.000</p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <div className='rounded flex p-2 gap-3' style={{ backgroundColor: '#F1F1F1' }}>
                                        <button className='px-3'>-</button>
                                        <p >5</p>
                                        <button className='px-3'>+</button>
                                    </div>
                                    <button className='rounded flex p-2' style={{ backgroundColor: '#F1F1F1' }}>
                                        <img src={trash} alt='delete' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <img src={item} alt='item' />
                            </div>
                            <div className='flex flex-col justify-evenly font-roboto '>
                                <div>
                                    <h4 className='text-xl'>Bala de techo LED de 9W</h4>
                                </div>
                                <div>
                                    <p className='text-lg'>$450.000</p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <div className='rounded flex p-2 gap-3' style={{ backgroundColor: '#F1F1F1' }}>
                                        <button className='px-3'>-</button>
                                        <p >5</p>
                                        <button className='px-3'>+</button>
                                    </div>
                                    <button className='rounded flex p-2' style={{ backgroundColor: '#F1F1F1' }}>
                                        <img src={trash} alt='delete' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='font-roboto flex flex-col gap-5'>
                    <div className='flex justify-between items-center'>
                        <p>Total</p>
                        <p>$180.000</p>
                    </div>
                    <button className='rounded-full text-lg bg-dorado w-full p-2 border border-vivvi'>
                        Guardar cambios
                    </button>
                    <button className='rounded-full text-lg bg-white w-full p-2 border border-vivvi'>
                        Editar toda la categoría
                    </button>
                </div>
            </div>
        </div>
    )
}
