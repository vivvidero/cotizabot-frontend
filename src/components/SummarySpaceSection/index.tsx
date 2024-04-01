import { Dispatch, FC, SetStateAction } from "react"
import { SummaryTipologyCard } from ".."
import { translateSpace } from "../../helpers/translateSpace"
import { Space, Summary } from "../../types/Summary"

interface Props {
    space: Space
    setSummaryProject: Dispatch<SetStateAction<Summary | undefined>>
}
export const SummarySpaceSection: FC<Props> = ({ space, setSummaryProject }) => {


    return (
        <section className="flex flex-col items-start w-9/12 my-4">
            <div className="flex items-center  gap-8 m-4">
                <h4 className="font-roboto font-semibold text-2xl text-vivvi"> {translateSpace(space.spacetype) + " " + (space.roomnumber == 1 ? '' : space.roomnumber)} </h4>

            </div>
            <hr className="w-full mb-4" />
            <div className="grid grid-cols-3 gap-4 w-full">
                {
                    space?.typologies
                    &&
                    space.typologies.filter((typology) => typology.area !== null).map((typology) => <SummaryTipologyCard key={typology?.spaceid} typology={typology} setSummaryProject={setSummaryProject} />)}
            </div>
        </section>
    )
}
