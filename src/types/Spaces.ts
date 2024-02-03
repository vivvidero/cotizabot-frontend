export interface Spaces {
    name: string,
    number: number,
    area?: string,
    mlLowCabinet?: string,
    mlHighCabinet?: string,
    mlIslandFurniture?: string,
    tipology?: string,
    tipologyImage?: File
    mlShower?: string,
    mlBathRoomFurniture?: string,
    mlCloset?: string,
    mlDesktop?: string,
    mlFurniture?: string
}


interface Space {
    isCheck: boolean,
    quantity: number,
    features: Features
}

interface Features {
    area?: string,
    mlLowCabinet?: string,
    mlHighCabinet?: string,
    mlIslandFurniture?: string,
    tipology?: string,
    tipologyImage?: File
    mlShower?: string,
    mlBathRoomFurniture?: string,
    mlCloset?: string,
    mlDesktop?: string,
    mlFurniture?: string
}

