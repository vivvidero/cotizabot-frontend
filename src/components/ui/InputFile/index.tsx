import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import addTipology from '../../../assets/icons/add-tipology.png'
import { Tipology } from '../../../types/Tipology';

interface Props {
    setNewTipology: Dispatch<SetStateAction<Tipology>>,
    name: string,
    label: string,
    file?: string

}

export const InputFile: FC<Props> = ({ setNewTipology, name, label, file }) => {

    const handleTipologyImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        setNewTipology((prevState) => {
            return {
                ...prevState,
                [e.target.name]: file
            }
        }
        )
    }

    return (
        <div className='py-2 px-5 border flex flex-col items-center overflow-hidden'>
            <label htmlFor={name} className='flex flex-col items-center cursor-pointer'>
                <img src={addTipology} className='w-20' />
                {file
                    ?
                    ''
                    :
                    label}
            </label>
            <input id={name} name={name} type='file' onChange={handleTipologyImage} className='hidden' />
            <p>{file}</p>
        </div>
    )
}
