import { FC, ReactNode } from "react"

interface Props {
    children: ReactNode
}

export const MiddleLayout: FC<Props> = ({ children }) => {

    return (
        <section className='w-full py-12 flex flex-col justify-center items-center '>
            
            {children}

        </section>
    )
}