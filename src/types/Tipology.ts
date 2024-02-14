export interface Tipology {
    name: string,
    type: string,
    privateArea: string,
    constructedArea: string,
    blueprints: File | null,
    revitModel: File | null,
    video: File | null,
    image: File | null
}