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
    neighborhood: string;
    address: string;
    type: string;
}

interface Props {
    infoProject: InfoProject | undefined;
}

export const ProjectBoxInfo: FC<Props> = ({ infoProject }) => {
    const { loading } = useContext(LoadingContext);
    const { projectid } = useParams();
    const navigate = useNavigate();

    // Desglosar propiedades de infoProject
    const { projectname, constructorname, neighborhood, address, type } = infoProject ?? {};

    // Manejador para editar el proyecto
    const handleEdit = () => {
        navigate(`/admin/projects/${projectid}/edit-project`);
    };

    // JSX para cada sección de información
    const infoSections = [
        { label: 'Proyecto', icon: projectIcon, text: projectname },
        { label: 'Constructora', icon: constructorIcon, text: constructorname },
        { label: 'Barrio', icon: locationIcon, text: neighborhood },
        { label: 'Dirección', icon: locationIcon, text: address },
        { label: 'Tipo', icon: checkIcon, text: type }
    ];

    return (
        <>
            {loading ? (
                <TypologiesBoxInfoSkeleton />
            ) : (
                <div className='w-full p-2 rounded-xl grid grid-cols-5 grid-rows-3 gap-2 font-roboto text-xl mb-4' style={{ boxShadow: '0px 4px 6px 0px rgba(195, 195, 195, 0.25)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    {/* Renderizar cada sección de información */}
                   
                    {infoSections.map(({ label, icon, text }) => (
                        <div key={label} className='bg-white rounded-lg p-1 flex justify-between items-center'>
                            <div><img src={icon} alt={label} /></div>
                            <div className='bg-honeydew p-1 rounded-xl'><p className='font-medium'>{text}</p></div>
                        </div>
                    ))}
                    {/* Botón de editar */}
                    <SubmitButton bg={''} handle={handleEdit}>Editar</SubmitButton>
                </div>
            )}
        </>
    );
};
