import { Dispatch, FC, SetStateAction, useContext } from 'react'
import imageTipo from '../../assets/images/tipoImage.png'
import edit from '../../assets/icons/Edit.png'
import deleteIcon from '../../assets/icons/delete.png'
import { SummaryInput } from '..';
import { Summary, TypologyElement } from '../../types/Summary';
import { NewProjectContext } from '../../context';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingContext } from '../../context/LoadingContext';
import  { deleteSpaceById, fetchSummary } from '../../api';

interface Props {
    typology: TypologyElement
    setSummaryProject: Dispatch<SetStateAction<Summary | undefined>>
}
/**
 * Componente que muestra una tarjeta de resumen para una tipología.
 */
export const SummaryTipologyCard: FC<Props> = (typology) => {
    const { projectid, typologyid } = useParams()

    const navigate = useNavigate()
    const {  setNewProject } = useContext(NewProjectContext)
    const { setLoading } = useContext(LoadingContext)

    /**Maneja la acción de editar el espacio asociado a la tipología.*/
    const handleEditSpace = () => {
        setNewProject((prevState) => {
            return {
                ...prevState,
                activeSpaceId: typology?.typology?.spaceid
            }
        })
        navigate(`/project/${projectid}/typology/${typologyid}/space/${typology?.typology?.spaceid}/edit`)
    }

    /**Maneja la acción de eliminar el espacio asociado a la tipología.*/
    const handleDeleteSpace = () => {
        if (!typology?.typology?.spaceid) {
            return
        }
        deleteSpaceById(typology?.typology?.spaceid)
            .then(() => {
                setLoading(true);
                if (projectid && typologyid) {
                    // Obtener Summary después de eliminar
                    fetchSummary(projectid, typologyid)
                        .then((data) => typology.setSummaryProject(data.data))
                        .then(() => setLoading(false));
                }
                
            })
            .catch(error => {
                console.error("Error al eliminar el proyecto:", error);
                setLoading(false);
            });
    }

    console.log(typology);
        

    return (
        <div className="w-full shadow-xl p-4 rounded-2xl flex flex-col gap-2 font-roboto">
            <div className="rounded overflow-hidden relative">
                <img src={typology?.typology?.image3d || imageTipo} alt="imagen tipologia" className="w-full h-40 object-contain" />
                <button className="border bg-dorado border-vivvi rounded-full p-1 absolute top-3 right-3 hover:scale-105 transition-all duration-150" onClick={handleEditSpace}>
                    <img src={edit} alt="editar" />
                </button>
                <button className="border bg-dorado border-vivvi rounded-full p-1 absolute top-14 right-3 hover:scale-105 transition-all duration-150" onClick={handleDeleteSpace}>
                    <img src={deleteIcon} alt="editar" />
                </button>
            </div>
            <h5 className="font-semibold text-xl">Tipologia: {typology?.typology?.spacetypology} </h5>
            {typology?.typology?.area && <SummaryInput data='Área' value={typology?.typology?.area} />}
            {typology?.typology?.demolitions && <SummaryInput data='Demoliciones' value={typology?.typology?.demolitions} />}
            {typology?.typology?.walls && <SummaryInput data='Muros' value={typology?.typology?.walls} />}
            {typology?.typology?.uppercabinetml && <SummaryInput data='Mueble Alto' value={typology?.typology?.uppercabinetml} />}
            {typology?.typology?.lowercabinetml && <SummaryInput data='Mueble bajo' value={typology?.typology?.lowercabinetml} />}
            {typology?.typology?.cubboard && <SummaryInput data='Alacena' value={typology?.typology?.cubboard} />}
            {typology?.typology?.islandorbar && <SummaryInput data='Isla o Barra' value={typology?.typology?.islandorbar} />}
            {typology?.typology?.slidingdoor && <SummaryInput data='Puerta corrediza' value={typology?.typology?.slidingdoor} />}
            {typology?.typology?.bathroomfurniture && <SummaryInput data='Mueble baño' value={typology?.typology?.bathroomfurniture} />}
            {typology?.typology?.veneeredwall && <SummaryInput data='Muro enchapado' value={typology?.typology?.veneeredwall} />}
            {typology?.typology?.showerdivision && <SummaryInput data='División ducha' value={typology?.typology?.showerdivision} />}
            {typology?.typology?.ceilingr && <SummaryInput data='Cielo raso' value={typology?.typology?.ceilingr} />}
            {typology?.typology?.closetml && <SummaryInput data='mlclosetml' value={typology?.typology?.closetml} />}
            {typology?.typology?.deskml && <SummaryInput data='Escritorio' value={typology?.typology?.deskml} />}
            {typology?.typology?.furnituretvlibrary && <SummaryInput data='Mueble (TV o biblioteca)' value={typology?.typology?.furnituretvlibrary} />}
            {typology?.typology?.shelf && <SummaryInput data='Repisa' value={typology?.typology?.shelf} />}
            {
                typology?.typology?.commentuser
                &&
                <div className="flex flex-col gap-2 justify-between items-center p-4 bg-white rounded-xl font-medium">
                    <h5>Comentario técnico</h5>
                    <p className="text-xs"> {typology?.typology?.commentuser} </p>
                </div>
            }

        </div>

    )
}
