import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

export interface Quotation {
    sellerName: string,
    quoteName: string,
    apartmentType: string,
    projectName: string,
    typology: string,
    styleCatalog: string,
    date: string,
    price: number
}

interface QuotationContextProps {
    quotation: Quotation,
    setQuotation: Dispatch<SetStateAction<Quotation>>,
}

interface Props {
    children: ReactNode
}

export const QuotationContext = createContext<QuotationContextProps>({} as QuotationContextProps)

export const QuotationProvider: FC<Props> = ({ children }) => {

    const [quotation, setQuotation] = useState({
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
        const storedQuotation = localStorage.getItem('quotation');
        console.log(storedQuotation);
        
        if (storedQuotation) {
            setQuotation(JSON.parse(storedQuotation));
        }
    }, [])


    return (
        <QuotationContext.Provider value={{ quotation, setQuotation }}>
            {children}
        </QuotationContext.Provider>
    )
}