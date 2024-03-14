import { FC, useContext } from 'react'
import projectIcon from '../../assets/icons/Icono-proyecto.png'
import constructorIcon from '../../assets/icons/constructora.png'
import locationIcon from '../../assets/icons/location.png'
import checkIcon from '../../assets/icons/check-redondo.png'
import { SubmitButton, TypologiesBoxInfoSkeleton } from '..'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingContext } from '../../context/LoadingContext'

interface InfoProject {
    projectid: number;
    projectname: string;
    constructorname: string;
    city: string;
    neighborhood: string;
    address: string;
    type: string;
}

interface Props {
    infoProject: InfoProject | undefined
}

export const TypologiesBoxInfo: FC<Props> = ({infoProject}) => {

    const { loading } = useContext(LoadingContext)
    const { projectid } = useParams()

    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/admin/projects/${projectid}/edit-project`)
    }

    return (
        <>
            {
                loading
                    ?
                    <TypologiesBoxInfoSkeleton />
                    :
                    <div className='w-full p-2 rounded-xl grid grid-cols-5 grid-rows-3 gap-2 font-roboto text-xl mb-4' style={{ 'boxShadow': '0px 4px 6px 0px rgba(195, 195, 195, 0.25)', 'backgroundColor': 'rgba(255, 255, 255, 0.5)' }}>
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
                                    {infoProject?.projectname}
                                </p>

                            </div>
                        </div>
                        <div className='bg-white rounded-lg p-1 flex justify-between items-center'>
                            <div>
                                <img src={constructorIcon} alt={'Constructora'} />
                            </div>
                            <div className='bg-honeydew p-1 rounded-xl'>
                                <p className='font-medium'>
                                    {infoProject?.constructorname}
                                </p>

                            </div>
                        </div>
                        <div className='bg-white rounded-lg p-1 flex justify-between items-center'>
                            <div>
                                <img src={locationIcon} alt={'Barrio'} />
                            </div>
                            <div className='bg-honeydew p-1 rounded-xl'>
                                <p className='font-medium'>
                                    {infoProject?.neighborhood}
                                </p>

                            </div>
                        </div>
                        <div className='bg-white rounded-lg p-1 flex justify-between items-center'>
                            <div>
                                <img src={locationIcon} alt={'Dirección'} />
                            </div>
                            <div className='bg-honeydew p-1 rounded-xl'>
                                <p className='font-medium'>
                                    {infoProject?.address}
                                </p>

                            </div>
                        </div>
                        <div className='bg-white rounded-lg p-1 flex justify-between items-center'>
                            <div>
                                <img src={checkIcon} alt={'Tipo'} />
                            </div>
                            <div className='bg-honeydew p-1 rounded-xl'>
                                <p className='font-medium'>
                                    {infoProject?.type}
                                </p>

                            </div>
                        </div>
                        <SubmitButton bg={''} handle={handleEdit} >
                            Editar
                        </SubmitButton>
                    </div>
            }

        </>


    )
}
