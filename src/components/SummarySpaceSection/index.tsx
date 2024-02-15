import { FC } from "react"
import { SummaryTipologyCard } from ".."
import edit from '../../assets/icons/Edit.png'

interface Props{
    space: string
}
export const SummarySpaceSection: FC<Props> = ({space}) => {
    return (
        <section className="flex flex-col items-start w-9/12 my-4">
            <div className="flex items-center  gap-8 m-4">
                <h4 className="font-roboto font-semibold text-2xl text-vivvi"> {space} </h4>
                <button className="border border-vivvi rounded-full p-1">
                    <img src={edit} alt="editar" />
                </button>
            </div>
            <hr className="w-full mb-4" />
            <div className="grid grid-cols-3 gap-4">

                <SummaryTipologyCard />
                <SummaryTipologyCard />
                <SummaryTipologyCard />

            </div>
        </section>
    )
}
