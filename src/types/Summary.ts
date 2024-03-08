/* export interface Summary {
    projectData: ProjectData;
    spaces: SummarySpace[];
}

export interface ProjectData {
    projectname: string;
    typologyname: string;
    city: string;
    constructorname: string;
    typologyid: number;
    typologytype: string;
    neighborhood: string;
    typologyimage: string;
    privatearea: number;
    builtarea: number;
    address: string;
    projecttype: string;
    spaces: TypologyElement[];
}


export interface SummarySpace {
    spacetype: string;
    roomnumber?: number;
    typologies: TypologyElement[];
    spaceid?: number
}
 */

export interface Summary {
    projectname:     string;
    typologyname:    string;
    city:            string;
    constructorname: string;
    typologyid:      number;
    typologytype:    string;
    neighborhood:    string;
    typologyimage:   string;
    privatearea:     number;
    builtarea:       number;
    address:         string;
    projecttype:     string;
    spaces:          Space[];
}

export interface Space {
    spacetype:  string;
    roomnumber: number;
    typologies: { [key: string]: number | null }[];
    
}

export interface TypologyElement {
    image3d?: string;
    spaceid?: number;
    spacetype?: string;
    area?: number;
    roomnumber?: number;
    spacetypology?: number;
    showerdivision?: number;
    ceilingr?: number;
    lowercabinetml?: number;
    walls?: number;
    demolitions?: number;
    cubboard?: number;
    islandorbar?: number;
    slidingdoor?: number;
    veneeredwall?: number;
    closetml?: number;
    deskml?: number;
    furnituretvlibrary?: number;
    shelf?: number;
    uppercabinetml?: number;
    bathroomfurniture?: number;
    commentuser?: string
    
}
