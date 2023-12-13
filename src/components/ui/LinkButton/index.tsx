import { FC, ReactNode } from "react"
import { Link } from "react-router-dom"

interface Props {
    children: ReactNode,
    link: string,
    bg: string,
}

export const LinkButton: FC<Props> = ({ children, link, bg }) => {

    const backgroundColor = bg === 'green' ? 'bg-vivvi text-white border-vivvi' : bg === 'golden' ? 'bg-dorado text-vivvi border-vivvi' : ''
    

    return (
        <Link to={link} target={link === 'https://mymind.com/' ? '_blank' : '_top'} className={`flex gap-2 px-5 py-2 w-fit rounded-full text-lg hover:scale-95 duration-200 border ${backgroundColor}`}  >
            {children}
        </Link>
    )
}
