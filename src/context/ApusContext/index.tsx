import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";
import { ApuInfo } from "../../types/apus/ApuInfo";
import { EditApuInfo } from "../../types/apus/EditApusInfo";


const initialValue = {
    code: '',
    name: '',
    unit: '',
    spaces: [],
    category: '',
    subCategory: '',
    price: '',
    references: [],
    dimension: '',
    finish: '',
    conectionType: ''
}

const editInitialValue = {
    id: 0,
    code: '',
    name: '',
    unit: '',
    spaces: [],
    category: '',
    subCategory: '',
    price: '',
    references: [{
        id: 1,
        code: '1241',
        name: "Piso",
        color: "Rojo",
        priceCeiling: 4500,
        itemImage: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        installedItemImage1: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        installedItemImage2: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        installedItemImage3: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    }],
    dimension: '',
    finish: '',
    conectionType: ''
}

interface ApusContextProps {
    newApu: ApuInfo
    setNewApu: Dispatch<SetStateAction<ApuInfo>>
    editApu: EditApuInfo
    setEditApu: Dispatch<SetStateAction<EditApuInfo>>
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
    editInfoCheck: boolean
    editReferencesCheck: boolean
    editDataSheetCheck: boolean
}

interface ImagePreview {
    id: number
    url: string,
    name: string,
}

interface Props {
    children: ReactNode
}

export const ApusContext = createContext<ApusContextProps>({} as ApusContextProps)

export const ApusProvider: FC<Props> = ({ children }) => {

    const [newApu, setNewApu] = useState<ApuInfo>(initialValue)
    const [editApu, setEditApu] = useState<EditApuInfo>(editInitialValue)
    const [apuFormData, setApuFormData] = useState<FormData>(new FormData)
    const [referencesForms, setFeferencesForms] = useState<number[]>([1])
    const [itemImages, setItemImages] = useState<ImagePreview[]>([]);
    const [installedItemImages, setInstalledItemImages] = useState<ImagePreview[]>([]);

    const infoCheck = newApu.name && newApu.code && newApu.unit && newApu.spaces.length > 0 && newApu.category && newApu.subCategory && newApu.price ? true : false
    const editInfoCheck = editApu.name && editApu.code && editApu.unit && editApu.spaces.length > 0 && editApu.category && editApu.subCategory && editApu.price ? true : false
    const referencesCheck = newApu.references[0]?.code && newApu.references[0]?.color && newApu.references[0]?.name && newApu.references[0]?.priceCeiling && apuFormData.get('itemImage1') && apuFormData.get('installedItemImage10') ? true : false
    const editReferencesCheck = editApu.references[0]?.code && editApu.references[0]?.color && editApu.references[0]?.name && editApu.references[0]?.priceCeiling && editApu.references[0]?.itemImage && editApu.references[0]?.installedItemImage1  ? true : false
    const dataSheetCheck = newApu.dimension && newApu.finish && newApu.conectionType ? true : false
    const editDataSheetCheck = editApu.dimension && editApu.finish && editApu.conectionType ? true : false


    return (
        <ApusContext.Provider value={{ newApu, setNewApu, editApu, setEditApu, apuFormData, setApuFormData, referencesForms, setFeferencesForms, itemImages, setItemImages, installedItemImages, setInstalledItemImages, infoCheck, referencesCheck, dataSheetCheck, editDataSheetCheck, editInfoCheck, editReferencesCheck }}>
            {children}
        </ApusContext.Provider>
    )
}