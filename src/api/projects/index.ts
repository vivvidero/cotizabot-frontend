import axios from "axios";
import { NewProject } from "../../context";
import { TypologiesData } from "../../types/Projects/Typologies";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


export const fetchProjects = async (page: number, projectsType: string) => {
    const response = await api.get(`/proyectos?page=${page}&type=${projectsType}`)
    return response
}

export const fetchProjectsPages = async (projectsType: string) => {
    const response = await api.get(`/projects/count?type=${projectsType}`)
    return response.data.totalPages
}

export const fetchProjectById = async (id: string) => {
    const response = await api.get(`/proyectos/${id}`)
    return response
}

export const createProject = async (newProject: NewProject) => {
    const response = await api.post(`/projects/new`, newProject)
    return response
}

export const updateProject = async (id: string, newproject: NewProject) => {
    const response = await api.put(`/project/${id}`, newproject)
    return response
}

export const fetchTypologiesByProjectId = async (id: string) => {
    const response = await api.get<TypologiesData[]>(`/projects/${id}/typologies`)
    return response
}

export const createTypology = async (formData: FormData) => {
    const response = await api.post(`/typologies`, formData)
    return response
}

export const fetchTypologyById = async (id: string) => {
    const response = await api.get(`/typology/${id}`)
    return response
}

export const createSpace = async (formDataSpaceTypo: FormData) => {
    const response = await api.post('/spaces', formDataSpaceTypo)
    return response
}

export const fetchSpacesByTypologyId = async (id: string) => {
    const response = await api.get(`/typologies/${id}/spaces`)
    return response
}

export const fetchSummary = async (projectId: string, typologyId: string) => {
    const response = await api.get(`/projects/${projectId}/typologies/${typologyId}/spaces`)
    return response
}

export const deleteSpaceById = async (spaceId: number) => {
    const response = await api.delete(`/proyectos/spaces/${spaceId}`)
    return response
}

export const fetchSpaceById = async (spaceId: string) => {
    const response = await api.get(`/proyectos/spaces/${spaceId}`)
    return response
}
export const updateSpaceById = async (spaceId: string, formDataSpaceTypo: FormData) => {
    const response = await api.put(`/proyectos/spaces/${spaceId}`, formDataSpaceTypo)
    return response
}

export default api