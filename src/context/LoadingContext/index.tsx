import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";



interface LoadingContextProps {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

interface Props {
    children: ReactNode
}

export const LoadingContext = createContext<LoadingContextProps>({} as LoadingContextProps)

export const LoadingProvider: FC<Props> = ({ children }) => {

    const [loading, setLoading] = useState<boolean>(false)



    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}