import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";



interface LoadingContextProps {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
    error: string,
    setError: Dispatch<SetStateAction<string>>
}

interface Props {
    children: ReactNode
}

export const LoadingContext = createContext<LoadingContextProps>({} as LoadingContextProps)

export const LoadingProvider: FC<Props> = ({ children }) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')


    return (
        <LoadingContext.Provider value={{ loading, setLoading,error, setError }}>
            {children}
        </LoadingContext.Provider>
    )
}