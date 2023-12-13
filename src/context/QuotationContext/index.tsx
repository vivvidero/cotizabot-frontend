import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";

interface Quotation {
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



    return (
        <QuotationContext.Provider value={{ quotation, setQuotation }}>
            {children}
        </QuotationContext.Provider>
    )
}