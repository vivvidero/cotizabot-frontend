import { FC, ReactNode } from 'react'
import { Header } from '../../components/'


interface Props {
    children: ReactNode
}

export const MainLayout: FC<Props> = ({ children }) => {
    return (
        <main className='w-full'>
            <Header />
            <div className='p-10' >
                {children}
            </div>
        </main>
    )
}
