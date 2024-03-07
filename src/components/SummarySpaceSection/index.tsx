import { FC, useState } from "react"
import { SummaryTipologyCard } from ".."
import edit from '../../assets/icons/Edit.png'
import { translateSpace } from "../../helpers/translateSpace"
import { Space } from "../../types/Summary"
import ReactModal from "react-modal"

interface Props {
    space: Space
}
export const SummarySpaceSection: FC<Props> = ({ space }) => {

    const [editMode, setEditMode] = useState<boolean>(false)
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
            <div className="grid grid-cols-3 gap-4 w-full">
                {
                    space?.typologies
                    &&
                    space.typologies.filter((typology) => typology.area !== null).map((typology) => <SummaryTipologyCard key={typology?.spaceid} typology={typology} setEditMode={setEditMode} />)}

            </div>

            <ReactModal isOpen={editMode} >

            </ReactModal>
        </section>
    )
}
