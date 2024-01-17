export interface Spaces {
    [key: string]: Space;
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
    mlShowe?: string,
    mlBathRoomFurniture?: string,
    mlCloset?: string,
    mlDesktop?: string,
    mlFurniture?: string
}

