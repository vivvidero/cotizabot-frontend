import { useState, Dispatch, SetStateAction } from 'react';

// Define el tipo para el token
type UserToken = {
    token: string | null;
    // Otros campos relacionados con el token, si los hay
};

type TokenHook = {
    setToken: Dispatch<SetStateAction<UserToken>>;
    token: string | null;
};

export const useToken = (): TokenHook => {
    const getToken = (): UserToken => {
        const tokenString = localStorage.getItem('token');
        const userToken: UserToken = tokenString ? JSON.parse(tokenString) : { token: null };
        return userToken;
    }

    const [token, setToken] = useState<UserToken>(getToken());

    const saveToken = (userToken: SetStateAction<UserToken>): void => {
        if (typeof userToken === 'function') {
            // Manejar la función de actualización del estado
            setToken((prevState) => {
                const updatedToken = userToken(prevState);
                localStorage.setItem('token', JSON.stringify(updatedToken));
                return updatedToken;
            });
        } else {
            // Manejar el valor directo del estado
            setToken(userToken);
            localStorage.setItem('token', JSON.stringify(userToken));
        }
    }

    return {
        setToken: saveToken,
        token: token.token
    }
}
