export interface Spaces {
    name: string,
    roomnumber: number,
    spaceid?: number,
    typology?: SingleSpace
}
 
export interface SingleSpace {
    spacetype: string,
    roomnumber: number,
    spaceid: number | undefined,
    area?: string,
    image3d?: File | null,
    actualstatus?: File | null,
    lowercabinetml?: string,
    uppercabinetml?: string,
    spacetypology?: string,
    bathroomfurniture?: string,
    closetml?: string,
    deskml?: string,
    walls?: string
    demolitions?: string
    cubboard?: string
    islandorbar?: string
    commentuser?: string
    slidingdoor?: string
    showerdivision?: string
    ceilingr?: string
    veneeredwall?: string
    furnituretvlibrary?: string
    shelf?: string
}

