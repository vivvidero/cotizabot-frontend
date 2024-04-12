export interface ApusTable {
    id: number;
    code: null;
    name: string;
    unit: string;
    totalValue: null | number;
    subCategory: string;
    unitPrice: string;
    references: ReferencesTable[];
}
export interface ReferencesTable {
    id?: number
    code?: string
    name?: string
    color?: string
    priceCeiling?: number
    itemImage: string
    installedItemImages: string[]
} 