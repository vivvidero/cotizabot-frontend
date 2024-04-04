import axios from "axios";
import { User } from "../../context";


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const login = async (user: User) => {

    const response = await api.post('/login', user)
    return response
}
