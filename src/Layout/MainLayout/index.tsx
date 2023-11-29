import { FC, ReactNode } from 'react'
import {Header} from '../../components/'


interface Props {
    children: ReactNode
}

export const MainLayout: FC<Props> = ({ children }) => {
    return (
        <main className='h-screen w-full'>
            <Header />
            {/* <Outlet /> */}
            {children}
        </main>
    )
}
