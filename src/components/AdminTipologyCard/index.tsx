import { FC } from 'react'
import tipologyPlaceholder from '../../assets/images/Rectangle 804.png'
import copy from '../../assets/icons/copy.png'
import del from '../../assets/icons/delete.png'
import { Tipology } from '../../types/Tipology'

interface Props {
    tipology: Tipology
}

export const AdminTipologyCard: FC<Props> = ({ tipology }) => {

    /* const selectTipology = () => {
        setNewProject((prevState) => {
            return {
                ...prevState,
                tipology: {
                    tipologyName: 'string',
                    tipologyType: 'string',
                    tipologyPrivateArea: 'string',
                    tipologyConstructedArea: 'string',
                    tipologyImage: null
                }
            }
        })
        localStorage.setItem('newProject', JSON.stringify({
            ...newProject, tipology: {
                tipologyName: 'A1',
                tipologyType: 'string',
                tipologyPrivateArea: 'string',
                tipologyConstructedArea: 'string',
                tipologyImage: null
            }
        }));
        navigate('/new-project/space-selector')
    } */


    return (
        <div className='rounded-3xl bg-white p-2 flex flex-col items-center max-h-80   '>
            <div className='rounded-3xl overflow-hidden'>
                <img src={tipologyPlaceholder} alt='Imagen Tipologgia' className='w-full h-40 object-cover' />
            </div>
            <div className='text-center font-outfit text-base font-normal'>
                <h4 className='text-lg'>
                    {tipology.tipologyName}
                </h4>
                <p> Área: {tipology.tipologyPrivateArea} </p>
                <p> Tipo: {tipology.tipologyType} </p>
            </div>
            <div className='flex gap-2 my-3'>
                <button className='border border-vivvi  px-6 rounded-full h-8'>
                    Editar
                </button>
                <button className='border border-vivvi rounded-full w-8 h-8 p-2'>
                    <img src={copy} className='w-full' />
                </button>
                <button className='border border-vivvi rounded-full w-8 h-8 p-2'>
                    <img src={del} className='w-full' />
                </button>
            </div>
        </div>
    )
}
