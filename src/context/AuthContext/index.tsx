import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import api from "../../api";
import { useToken } from "../../hooks";
import { LoadingContext } from "../LoadingContext";

export interface User {
    email: string,
    password: string,
    nickname?: string
}

export interface AuthContextProps {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    error: string,
    signIn: (user: User) => Promise<void>,
    logout: () => void
    token: string | null
    nickname: string | null
}

interface Props {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: FC<Props> = ({ children }) => {

    const { token, setToken } = useToken();
    const [nickname, setNickName] = useState<string | null>('')
    const {setLoading} = useContext(LoadingContext)
    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string>('')


    const signIn = async (user: User): Promise<void> => {
        setLoading(true)
        if (user.email === '' || user.password === '') {
            setError('Todos los campos son obligatorios')
            setLoading(false)
            return
        }
        try {
            const response = await api.post('/login', user)
            console.log(response);
            setToken(response.data.token)
            setNickName(response.data.user)
            localStorage.setItem('nickname', JSON.stringify(response.data.user))
            setLoading(false)
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.error || 'Error desconocido')
            setLoading(false)
            setTimeout(() => {
                setError('')
            }, 4000);
        }
    }

    const logout = () => {
        setLoading(true)
        // Eliminar el token de autenticación
        setToken(null);
        setUser({
            email: '',
            password: ''
        })
        // Limpiar el nombre de usuario de la memoria local
        localStorage.removeItem('nickname');
        setLoading(false)
    }

    useEffect(() => {
        const nicknameStorage = localStorage.getItem('nickname')
        setNickName(nicknameStorage ? JSON.parse(nicknameStorage) : null)
    }, [])


    return (
        <AuthContext.Provider value={{ user, setUser, error, signIn, token, nickname, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
