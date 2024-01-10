import { FC, useContext } from 'react'
import tipologyPlaceholder from '../../assets/images/Rectangle 804.png'
import { NewProjectContext } from '../../context/NewProjectContext'
import { useNavigate } from 'react-router-dom'

interface Props {
    tipology: number
}

export const AdminTipologyCard: FC<Props> = ({ tipology }) => {

    const navigate = useNavigate()
    const { setNewProject, newProject } = useContext(NewProjectContext)

    const selectTipology = () => {
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
    }

    return (
        <div className='rounded-3xl bg-white py-2 px-1 flex flex-col items-center   '>
            <div className='rounded-3xl overflow-hidden'>
                <img src={tipologyPlaceholder} alt='' />
            </div>
            <h4 className='text-center font-outfit text-lg'>
                Nombre
            </h4>
            <button className='border border-vivvi py-2 px-6 rounded-full w-3/4 my-3' onClick={selectTipology}>
                Seleccionar
            </button>
        </div>
    )
}
