export interface Spaces {
    name: string,
    roomNumber: number,
    spaceId?: number
}

export interface SingleSpace {
    spaceType: string,
    roomNumber: number,
    spaceId: number | undefined,
    area?: string,
    image3D?: File | null,
    actualStatus?: File | null,
    lowCabinet?: string,
    highCabinet?: string,
    spaceTypology?: string,
    bathroomFurniture?: string,
    closet?: string,
    desktop?: string,
    walls?: string
    demolitions?: string
    cubBoard?: string
    islandOrBar?: string
    commentUser?: string
    slidingDoor?: string
    showerDivision?: string
    ceiling?: string
    veneeredWall?: string
    furnitureTVLibrary?: string
    shelf?: string
}

