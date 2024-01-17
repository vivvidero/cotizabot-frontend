import edit from "../../assets/icons/Edit.png"
import trash from "../../assets/icons/Delete.png"
import { FC } from "react"

interface Props {
    supplieName: string
}
export const SupplieRow: FC<Props> = ({supplieName}) => {
    return (
        <div className="border-b border-b-platinum w-full flex justify-between items-center p-2 ">
            <div className="flex gap-4">
                <input type="checkbox" />
                <label>{supplieName} </label>
            </div>
            <div className="flex gap-4">
                <button>
                    <img src={edit} alt="edit" />
                </button>
                <button>
                    <img src={trash} alt="delete" />
                </button>
            </div>
        </div>
    )
}
