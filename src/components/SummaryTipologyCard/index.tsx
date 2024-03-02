import { FC } from 'react'
import imageTipo from '../../assets/images/tipoImage.png'
import { SummaryInput } from '..';



export const SummaryTipologyCard = (typology) => {


    return (
        <div className="w-full shadow-xl p-4 rounded-2xl flex flex-col gap-2 font-roboto">
            <div className="rounded overflow-hidden">
                <img src={imageTipo} alt="imagen tipologia" className="w-full" />
            </div>
            <h5 className="font-semibold text-xl"> {typology?.typology?.typology} </h5>
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
                typology?.typology?.highCabinet
                &&
                <SummaryInput data='Mueble Alto' value={typology?.typology?.highCabinet} />

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
                typology?.typology?.bathroomFurniture
                &&
                <SummaryInput data='Mueble baño' value={typology?.typology?.bathroomFurniture} />
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
                typology?.typology?.closet
                &&
                <SummaryInput data='Closet' value={typology?.typology?.closet} />
            }
            {
                typology?.typology?.desktop
                &&
                <SummaryInput data='Escritorio' value={typology?.typology?.desktop} />
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
