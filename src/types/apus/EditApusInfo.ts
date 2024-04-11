export interface EditApuInfo {
    id?: number
    code: string,
    name: string,
    unit: string,
    spaces: string[],
    category: string,
    subCategory: string,
    price: string
    iva?: boolean
    references: EditReferences[]
    dimension: string
    finish: string
    conectionType: string
    recomendations?: string
}

export interface EditReferences {
    id?: number
    code?: string
    name?: string
    color?: string
    priceCeiling?: number
    itemImage?: string
    installedItemImage1?: string
    installedItemImage2?: string
    installedItemImage3?: string
} 