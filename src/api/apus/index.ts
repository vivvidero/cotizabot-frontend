import axios from "axios";
import { ApuInfo } from "../../types/apus/ApuInfo";
import { DataSheet } from "../../types/apus/DataSheet";

const apusApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const fetchApus = async (page: number) => {
    const response = await apusApi.get(`/apus?page=${page}`)
    return response
}

export const createApu = async (newApu: ApuInfo) => {
    const response = await apusApi.post('/apus', newApu)
    return response
}

export const createDataSheet = async (dataSheet: DataSheet, apuId: string) => {
    const response = await apusApi.post(`/apus/${apuId}/data-sheet`, { dataSheet: dataSheet })
    return response
}

export const fetchApuDashBoard = async (id: string) => {
    const response = await apusApi.get(`/apus/${id}/dashboard`)
    return response
}

export const editApu = async (id: string, editedApu: ApuInfo) => {
    const response = await apusApi.put(`/apus/${id}`, editedApu)
    return response
}