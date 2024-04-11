import { useState, Dispatch, SetStateAction } from 'react';


type TokenHook = {
    setToken: Dispatch<SetStateAction<string | null>>;
    token: string | null;
};

export const useToken = (): TokenHook => {
    const getToken = (): string | null => {
        const tokenString = localStorage.getItem('token');
        const userToken: string | null = tokenString ? tokenString : null
        return userToken;
    }

    const [token, setToken] = useState<string | null>(getToken());

    const saveToken = (userToken: SetStateAction<string | null>): void => {
        if (userToken) {
            setToken(userToken);
            localStorage.setItem('token', JSON.stringify(userToken));
        } else {
            setToken(null);
            localStorage.removeItem('token');
        }
    }    

    return {
        setToken: saveToken,
        token
    }
}
