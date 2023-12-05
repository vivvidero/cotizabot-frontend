import { FC, ReactNode } from "react"
import { Link } from "react-router-dom"

interface Props {
    children: ReactNode,
    link: string
}

export const BotonVerde: FC<Props> = ({ children, link }) => {
    return (
        <Link to={link} target={link === 'https://mymind.com/' ? '_blank' : '_top'} className='flex gap-2 bg-vivvi px-5 py-3 w-fit rounded-full text-white text-lg hover:scale-95 duration-200'  >
            {children}
        </Link>
    )
}
