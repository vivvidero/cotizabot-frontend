import { useContext } from 'react'
import { NewProjectContext } from '../../context'
import projectIcon from '../../assets/icons/Icono-proyecto.png'
import constructorIcon from '../../assets/icons/constructora.png'
import locationIcon from '../../assets/icons/location.png'
import checkIcon from '../../assets/icons/check-redondo.png'
import { SubmitButton } from '..'
import { useNavigate } from 'react-router-dom'

export const TypologiesBoxInfo = () => {

    const { newProject } = useContext(NewProjectContext)
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate('/admin/projects/edit-project')
    }
    

    return (
        <div className='w-full p-2 rounded-lg grid grid-cols-5 grid-rows-3 gap-2 font-roboto text-xl mb-4' style={{ 'boxShadow': '0px 4px 6px 0px rgba(195, 195, 195, 0.25)' }}>
            <div className='flex items-center'><p>Proyecto</p></div>
            <div className='flex items-center'><p>Constructora</p></div>
            <div className='flex items-center'><p>Barrio</p></div>
            <div className='flex items-center'><p>Dirección</p></div>
            <div className='flex items-center'><p>Tipo</p></div>

            <div className='bg-white rounded-lg p-1 flex justify-between items-center'>
                <div>
                    <img src={projectIcon} alt={'Proyecto'} />
                </div>
                <div className='bg-honeydew p-1 rounded-xl'>
                    <p className='font-medium'>
                        {newProject.projectname}
                    </p>

                </div>
            </div>
            <div className='bg-white rounded-lg p-1 flex justify-between items-center'>
                <div>
                    <img src={constructorIcon} alt={'Constructora'} />
                </div>
                <div className='bg-honeydew p-1 rounded-xl'>
                    <p className='font-medium'>
                        {newProject.constructorname}
                    </p>

                </div>
            </div>
            <div className='bg-white rounded-lg p-1 flex justify-between items-center'>
                <div>
                    <img src={locationIcon} alt={'Barrio'} />
                </div>
                <div className='bg-honeydew p-1 rounded-xl'>
                    <p className='font-medium'>
                        {newProject.neighborhood}
                    </p>

                </div>
            </div>
            <div className='bg-white rounded-lg p-1 flex justify-between items-center'>
                <div>
                    <img src={locationIcon} alt={'Dirección'} />
                </div>
                <div className='bg-honeydew p-1 rounded-xl'>
                    <p className='font-medium'>
                        {newProject.address}
                    </p>

                </div>
            </div>
            <div className='bg-white rounded-lg p-1 flex justify-between items-center'>
                <div>
                    <img src={checkIcon} alt={'Tipo'} />
                </div>
                <div className='bg-honeydew p-1 rounded-xl'>
                    <p className='font-medium'>
                        {newProject.type}
                    </p>

                </div>
            </div>
            <SubmitButton bg={''} handle={handleEdit} >
                Editar
            </SubmitButton>
        </div>
    )
}
