import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { Projects } from '../../../types/Projects/Projects'

interface Props {
    placeholder: string
    name: string
    value: string,
    setState: Dispatch<SetStateAction<Projects>>
}

export const EditInput: FC<Props> = ({ placeholder, name, value, setState }) => {

    const handleProject = (e: ChangeEvent<HTMLInputElement>) => {

        setState((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <input className='py-6 px-5 border' type='text' placeholder={placeholder} name={name} defaultValue={value} onChange={handleProject} />
    )
}
