import {  FC, ReactNode, createContext, useEffect, useState } from "react";

interface NewApu{
    name: string,
    material: string,
    finish: string
}

interface NewApuContextProps {

}

interface Props {
    children: ReactNode
}

export const NewApuContext = createContext<NewApuContextProps>({} as NewApuContextProps)

export const NewApuProvider: FC<Props> = ({ children }) => {

    const [newApu, setNewApu] = useState({
       
    })

    useEffect(() => {
        
    }, [])


    return (
        <NewApuContext.Provider value={{ newApu, setNewApu }}>
            {children}
        </NewApuContext.Provider>
    )
}