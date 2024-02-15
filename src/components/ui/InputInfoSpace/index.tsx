import { ChangeEvent, FC } from "react"

interface Props {
    handle: (e: ChangeEvent<HTMLInputElement>) => void
    name: string,
    label: string,
    unit: string
}

export const InputInfoSpace: FC<Props> = ({ handle, name, label, unit }) => {
    return (
        <div className="flex flex-col">
            <p className="mx-2 font-roboto font-normal text-lg text-battleGray"> {label} </p>
            <div className="flex gap-2">
                <label className="p-2 bg-white border border-platinum w-10/12 rounded-lg">
                    <input type="text" name={name} className="w-full" onChange={handle} />
                </label>
                <div className="p-2 bg-white border border-platinum w-2/12 rounded-lg grid place-content-center">
                    {unit}
                </div>
            </div>
        </div>
    )
}
