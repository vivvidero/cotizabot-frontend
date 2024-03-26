import axios from "axios";
import { ApuInfo } from "../../types/apus/ApuInfo";
import { DataSheet } from "../../types/apus/DataSheet";

const apusApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const createApu = async (newApu: ApuInfo) => {
    const response = await apusApi.post('/apu', newApu)
    return response
}

export const createDataSheet = async (dataSheet: DataSheet, apuId: string) => {
    const response = await apusApi.post(`/apu/${apuId}/data-sheet`, dataSheet)
    return response
}