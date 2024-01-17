import {  FC, ReactNode, createContext, useEffect, useState } from "react";



interface NewApuContextProps {

}

interface Props {
    children: ReactNode
}

export const NewApuContext = createContext<NewApuContextProps>({} as NewApuContextProps)

export const NewApuProvider: FC<Props> = ({ children }) => {

    const [newApu, setNewApu] = useState({
        sellerName: '',
        quoteName: '',
        apartmentType: '',
        projectName: '',
        typology: '',
        styleCatalog: '',
        date: '',
        price: 0
    })

    useEffect(() => {
        const storedQuotation = localStorage.getItem('new-apu');

        if (storedQuotation) {
            console.log(newApu);

            console.log(storedQuotation);

            setNewApu(JSON.parse(storedQuotation));
        }
    }, [])


    return (
        <NewApuContext.Provider value={{ newApu, setNewApu }}>
            {children}
        </NewApuContext.Provider>
    )
}