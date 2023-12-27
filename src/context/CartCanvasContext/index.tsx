import {  FC, ReactNode, createContext, useState } from "react";


interface CartCanvasContextProps {
    toggleOffCanvas: () => void,
    isOffCanvasOpen: boolean
}

interface Props {
    children: ReactNode
}

export const CartCanvasContext = createContext<CartCanvasContextProps>({} as CartCanvasContextProps)

export const CartCanvasProvider: FC<Props> = ({ children }) => {

    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

    const toggleOffCanvas = () => {
        setIsOffCanvasOpen(!isOffCanvasOpen);
    };

    return (
        <CartCanvasContext.Provider value={{ toggleOffCanvas, isOffCanvasOpen }}>
            {children}
        </CartCanvasContext.Provider>
    )
}