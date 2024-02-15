export interface Spaces {
    name: string,
    roomNumber: number,
}

export interface SingleSpace {
    space: string
    area?: string,
    image3D?: File | null,
    actualStatus?: File | null,
    lowCabinet?: string,
    highCabinet?: string,
    mlIslandFurniture?: string,
    tipology?: string,
    tipologyImage?: File | null
    shower?: string,
    bathroomFurniture?: string,
    closet?: string,
    desktop?: string,
    furniture?: string
    walls?: string
    demolitions?: string
    cubBoard?: string
    islandOrBar?: string
    comment?: string
    slidingDoor?: string
    showerDivision?: string
    ceiling?: string
    veneeredWall?: string
    furnitureTVLibrary?: string
    shelf?: string
}

