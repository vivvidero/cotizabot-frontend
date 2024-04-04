import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import addTipology from '../../../assets/icons/add-tipology.png'
import { Typology } from '../../../types/Projects/Tipology';

interface Props {
    setNewTipology: Dispatch<SetStateAction<Typology>>,
    name: 'blueprints' | 'revitModel' | 'video',
    label: string,
}

interface FileNames {
    blueprints: string,
    revitModel: string,
    video: string
}

export const InputFile: FC<Props> = ({ setNewTipology, name, label }) => {

    const [fileName, setFileNames] = useState<FileNames>({
        blueprints: '',
        revitModel: '',
        video: ''
    })

    const handleTipologyImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) {
            console.log("No hay Archivo");
            return
        }

        setFileNames((prevState) => {
            return {
                ...prevState,
                [e.target.name]: file.name
            }
        })

        const formData = new FormData()
        formData.append(e.target.name, file);
        setNewTipology((prevState: Typology) => {
            return {
                ...prevState,
                [e.target.name]: formData
            }
        }
        )
    }

    return (
        <div className='py-2 px-5 border flex flex-col items-center overflow-hidden'>
            <label htmlFor={name} className='flex flex-col items-center cursor-pointer'>
                <img src={addTipology} className='w-20' />
                {fileName[name]
                    ?
                    ''
                    :
                    label}
            </label>
            <input id={name} name={name} type='file' onChange={handleTipologyImage} className='hidden' />
            <p>{fileName[name]}</p>
        </div>
    )
}
