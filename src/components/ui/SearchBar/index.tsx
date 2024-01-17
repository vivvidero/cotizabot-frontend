import { FC } from "react"

interface Props {
    lookingFor : string
}

export const SearchBar: FC<Props> = ({lookingFor}) => {
    return (
        <div className="flex justify-center mb-16">
            <input type="text" placeholder={`Buscar ${lookingFor}...`} className="m-0 bg-transparent font-roboto italic font-[400] text-5xl border-b border-b-cadet-gray text-center" />
        </div>
    )
}
