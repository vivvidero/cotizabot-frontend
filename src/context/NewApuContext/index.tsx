import {  Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

interface NewApu{
    name: string,
    material: string,
    finish: string
}
const initialApu = {
    name: '',
    material: '',
    finish: ''
}

interface NewApuContextProps {
    newApu: NewApu
    setNewApu: Dispatch<SetStateAction<NewApu>>
}

interface Props {
    children: ReactNode
}

export const NewApuContext = createContext<NewApuContextProps>({} as NewApuContextProps)

export const NewApuProvider: FC<Props> = ({ children }) => {

    const [newApu, setNewApu] = useState(initialApu)

    useEffect(() => {
        
    }, [])


    return (
        <NewApuContext.Provider value={{ newApu, setNewApu }}>
            {children}
        </NewApuContext.Provider>
    )
}