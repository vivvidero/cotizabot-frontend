import { Dispatch, FC, SetStateAction, useContext } from 'react'
import imageTipo from '../../assets/images/tipoImage.png'
import edit from '../../assets/icons/Edit.png'
import { SummaryInput } from '..';
import { TypologyElement } from '../../types/Summary';
import { NewProjectContext } from '../../context';
import { useNavigate } from 'react-router-dom';

interface Props {
    typology: TypologyElement
    setEditMode: Dispatch<SetStateAction<boolean>>
}

export const SummaryTipologyCard: FC<Props> = (typology) => {

    const navigate = useNavigate()
    const {newProject, setNewProject} = useContext(NewProjectContext)
    console.log(typology);
    const handleEditSpace = () => {

        localStorage.setItem('newProject', JSON.stringify({...newProject, activeSpaceId: typology?.typology?.spaceid}))
        setNewProject((prevState) => {
            return {
                ...prevState,
                activeSpaceId: typology?.typology?.spaceid
            }
        })
        navigate(`/project/typology/space/edit`)
    }

    return (
        <div className="w-full shadow-xl p-4 rounded-2xl flex flex-col gap-2 font-roboto">
            <div className="rounded overflow-hidden relative">
                <img src={typology?.typology?.image3d || imageTipo} alt="imagen tipologia" className="w-full h-40 object-contain" />
                <button className="border bg-dorado border-vivvi rounded-full p-1 absolute top-3 right-3 hover:scale-105 transition-all duration-150" onClick={handleEditSpace}>
                    <img src={edit} alt="editar" />
                </button>
            </div>
            <h5 className="font-semibold text-xl">Tipologia: {typology?.typology?.spacetypology} </h5>
            {
                typology?.typology?.area
                &&
                <SummaryInput data='Área' value={typology?.typology?.area} />

            }
            {
                typology?.typology?.demolitions
                &&
                <SummaryInput data='Demoliciones' value={typology?.typology?.demolitions} />

            }
            {
                typology?.typology?.walls
                &&
                <SummaryInput data='Muros' value={typology?.typology?.walls} />

            }
            {
                typology?.typology?.uppercabinetml
                &&
                <SummaryInput data='Mueble Alto' value={typology?.typology?.uppercabinetml} />

            }
            {
                typology?.typology?.lowercabinetml
                &&
                <SummaryInput data='Mueble bajo' value={typology?.typology?.lowercabinetml} />

            }
            {
                typology?.typology?.cubboard
                &&
                <SummaryInput data='Alacena' value={typology?.typology?.cubboard} />
            }
            {
                typology?.typology?.islandorbar
                &&
                <SummaryInput data='Isla o Barra' value={typology?.typology?.islandorbar} />
            }
            {
                typology?.typology?.slidingdoor
                &&
                <SummaryInput data='Puerta corrediza' value={typology?.typology?.slidingdoor} />
            }
            {
                typology?.typology?.bathroomfurniture
                &&
                <SummaryInput data='Mueble baño' value={typology?.typology?.bathroomfurniture} />
            }
            {
                typology?.typology?.veneeredwall
                &&
                <SummaryInput data='Muro enchapado' value={typology?.typology?.veneeredwall} />
            }
            {
                typology?.typology?.showerdivision
                &&
                <SummaryInput data='División ducha' value={typology?.typology?.showerdivision} />
            }
            {
                typology?.typology?.ceilingr
                &&
                <SummaryInput data='Cielo raso' value={typology?.typology?.ceilingr} />
            }
            {
                typology?.typology?.closetml
                &&
                <SummaryInput data='mlclosetml' value={typology?.typology?.closetml} />
            }
            {
                typology?.typology?.deskml
                &&
                <SummaryInput data='Escritorio' value={typology?.typology?.deskml} />
            }
            {
                typology?.typology?.furnituretvlibrary
                &&
                <SummaryInput data='Mueble (TV o biblioteca)' value={typology?.typology?.furnituretvlibrary} />
            }
            {
                typology?.typology?.shelf
                &&
                <SummaryInput data='Repisa' value={typology?.typology?.shelf} />
            }


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
