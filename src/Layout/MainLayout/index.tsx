import { FC, ReactNode } from 'react'
import { Header } from '../../components/'


interface Props {
    children: ReactNode
}

export const MainLayout: FC<Props> = ({ children }) => {

    return (
        <main className='w-full min-h-screen flex flex-col'>
            <Header />

            {children}

        </main>
    )
}
