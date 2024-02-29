import { FC } from "react"
import { SummaryTipologyCard } from ".."
import edit from '../../assets/icons/Edit.png'
import { Spaces } from "../../types/Spaces"
import { translateSpace } from "../../helpers/translateSpace"

interface Props {
    space: Spaces
}
export const SummarySpaceSection: FC<Props> = ({ space }) => {


    console.log(space);
    

    return (
        <section className="flex flex-col items-start w-9/12 my-4">
            <div className="flex items-center  gap-8 m-4">
                <h4 className="font-roboto font-semibold text-2xl text-vivvi"> {translateSpace(space.spacetype) + " " + (space.roomnumber === 1 ? '' : space.roomnumber)} </h4>
                <button className="border border-vivvi rounded-full p-1">
                    <img src={edit} alt="editar" />
                </button>
            </div>
            <hr className="w-full mb-4" />
            <div className="grid grid-cols-3 gap-4">
                {space.typologies.map((typology) => <SummaryTipologyCard key={typology?.spaceid} typology={typology} />)}

            </div>
        </section>
    )
}
