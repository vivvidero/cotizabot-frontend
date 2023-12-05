import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";
import api from "../../api";
import { useToken } from "../../hooks";

export interface User {
    email: string,
    password: string
}

export interface AuthContextProps {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    error: string,
    isAuthenticated: boolean,
    signIn: (user: User) => Promise<void>,
    token: string | null
}

interface Props {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: FC<Props> = ({ children }) => {

    const { token, setToken } = useToken();


    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string>('')
    const [isAuthenticated, setIsAuthenticated] = useState(true)


    const signIn = async (user: User): Promise<void> => {
        if (user.email === '' || user.password === '') {
            setError('Todos los campos son obligatorios')
            return
        }
        try {
            const response = await api.post('/login', user)
            console.log(response);
            setToken(response.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.error(error);
            setError(error.response?.data || 'Error desconocido')
            setIsAuthenticated(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, error, isAuthenticated, signIn, token }}>
            {children}
        </AuthContext.Provider>
    )
}
