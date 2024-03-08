import { ChangeEvent, FC } from "react"


interface Props {
    handle: (e: ChangeEvent<HTMLSelectElement>) => void
    options: string[]
    value: string | undefined
}

export const SelectInfoSpace: FC<Props> = ({ handle, options, value }) => {



    return (
        <div className="flex flex-col">
            <p className="mx-2 font-roboto font-normal text-lg text-battleGray"> Tipología </p>
            <label className=" p-2 bg-white border border-platinum flex items-center" >
                <select name='spacetypology' onChange={handle} className="w-full" value={value ? value : ''} required>
                    <option defaultChecked defaultValue={''}></option>
                    {options.map((option) => <option key={option}> {option} </option>)}
                </select>
            </label>
        </div>
    )
}
