import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useToken } from "../../hooks";
import { LoadingContext } from "../LoadingContext";
import { login } from "../../api/login";
import axios from "axios";

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
/**
 * Contexto de autenticación para gestionar la autenticación del usuario.
 */
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

/**
 * Componente proveedor de autenticación que envuelve la aplicación y proporciona el contexto de autenticación.
 */
export const AuthProvider: FC<Props> = ({ children }) => {

    const { token, setToken } = useToken();
    const [nickname, setNickName] = useState<string | null>('')
    const { setLoading } = useContext(LoadingContext)
    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string>('')


    /**
         * Función para iniciar sesión.
         * @param user Usuario a autenticar
         */
    const signIn = async (user: User): Promise<void> => {
        setLoading(true)

        // Validar campos de usuario
        if (user.email === '' || user.password === '') {
            setError('Todos los campos son obligatorios')
            setLoading(false)
            return
        }
        try {
            const response = await login(user)

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
    /**
         * Función para cerrar sesión.
         */
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
    /**
         * Efecto para cargar el apodo del almacenamiento local al cargar el componente.
         */
    useEffect(() => {
        const nicknameStorage = localStorage.getItem('nickname')
        setNickName(nicknameStorage ? JSON.parse(nicknameStorage) : null)
    }, [])



    // Efecto para verificar si el token es valido y no esta vencido
    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                return
            }
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/jwt-token`, { token });

                if (response.data.success) {
                    return
                } else {
                    setToken(null)
                    throw new Error('Token inválido');
                }
            } catch (error) {
                setToken(null)
            }
            setLoading(false);
        };

        verifyToken();
    }, [])



    return (
        <AuthContext.Provider value={{ user, setUser, error, signIn, token, nickname, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
