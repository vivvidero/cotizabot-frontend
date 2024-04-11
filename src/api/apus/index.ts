import axios from "axios";

export const apusApi = axios.create({
    baseURL: import.meta.env.VITE_APUS_URL
})

export const fetchApus = async (page: number) => {
    const response = await apusApi.get(`/apus?page=${page}`)
    return response
}

export const createApu = async (apuFormData: FormData) => {
    const response = await apusApi.post('/create-apu', apuFormData)
    return response
}
export const fetchApuById = async (id: string) => {
    const response = await apusApi.get(`/apus/${id}`)
    return response
}

export const apuEdit = async (id: string, editedApu: FormData) => {
    const response = await apusApi.put(`/apus/${id}`, editedApu)
    return response
}
export const deleteApu = async (id: number) => {
    const response = await apusApi.delete(`/apus/${id}`)
    return response
}
