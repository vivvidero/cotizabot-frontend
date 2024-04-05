import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";
import { ApuInfo } from "../../types/apus/ApuInfo";


const initialValue = {
    code: '',
    name: '',
    unit: '',
    spaces: [],
    category: '',
    subCategory: '',
    price: 0,
    references: [],
    dimension: '',
    finish: '',
    conectionType: ''
}

interface NewApuContextProps {
    newApu: ApuInfo
    setNewApu: Dispatch<SetStateAction<ApuInfo>>
    apuFormData: FormData,
    setApuFormData: Dispatch<SetStateAction<FormData>>
    referencesForms: number[],
    setFeferencesForms: Dispatch<SetStateAction<number[]>>
    itemImages: ImagePreview[]
    setItemImages: Dispatch<SetStateAction<ImagePreview[]>>
    installedItemImages: ImagePreview[]
    setInstalledItemImages: Dispatch<SetStateAction<ImagePreview[]>>
    infoCheck: boolean
    referencesCheck: boolean
    dataSheetCheck: boolean
}

interface ImagePreview {
    id: number
    url: string,
    name: string,
}

interface Props {
    children: ReactNode
}

export const NewApuContext = createContext<NewApuContextProps>({} as NewApuContextProps)

export const NewApuProvider: FC<Props> = ({ children }) => {

    const [newApu, setNewApu] = useState<ApuInfo>(initialValue)
    const [apuFormData, setApuFormData] = useState<FormData>(new FormData)
    const [referencesForms, setFeferencesForms] = useState<number[]>([1])
    const [itemImages, setItemImages] = useState<ImagePreview[]>([]);
    const [installedItemImages, setInstalledItemImages] = useState<ImagePreview[]>([]);

    const infoCheck = newApu.name && newApu.code && newApu.unit && newApu.spaces.length > 0 && newApu.category && newApu.subCategory && newApu.price ? true : false
    const referencesCheck = newApu.references[0]?.code && newApu.references[0]?.color && newApu.references[0]?.name && newApu.references[0]?.priceCeiling && apuFormData.get('itemImage1') && apuFormData.get('installedItemImage10') ? true : false
    const dataSheetCheck = newApu.dimension && newApu.finish && newApu.conectionType ? true : false


    return (
        <NewApuContext.Provider value={{ newApu, setNewApu, apuFormData, setApuFormData, referencesForms, setFeferencesForms, itemImages, setItemImages, installedItemImages, setInstalledItemImages, infoCheck , referencesCheck, dataSheetCheck}}>
            {children}
        </NewApuContext.Provider>
    )
}