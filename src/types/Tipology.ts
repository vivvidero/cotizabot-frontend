export interface Typology {
    projectId?: number
    typologyName: string,
    type: string,
    privateArea: string,
    builtArea: string,
    blueprints: FormData | null,
    revitModel: FormData | null,
    video: FormData | null,
    image: FormData | null
}