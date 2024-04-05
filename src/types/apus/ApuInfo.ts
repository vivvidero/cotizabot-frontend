export interface ApuInfo {
    code: string,
    name: string,
    unit: string,
    spaces: string[],
    category: string,
    subCategory: string,
    price: string
    iva?: boolean
    references: References[]
    dimension: string
    finish: string
    conectionType: string
    recomendations?: string
}

export interface References {
    id?: number
    code?: string
    name?: string
    color?: string
    priceCeiling?: number
} 