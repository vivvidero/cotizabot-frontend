export interface Typology {
    projectid?: number
    typologyName: string,
    type: string,
    privateArea: string,
    builtArea: string,
    blueprints: string,
    revitModel: string,
    video: string,
    image: FormData | null
    typologyid?: number
}