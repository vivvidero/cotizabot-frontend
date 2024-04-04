import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { Projects } from '../../../types/Projects/Projects'

interface Props {
    label: string
    name: string
    value: string
    defaultValue?: string,
    setState: Dispatch<SetStateAction<Projects>>
}

export const EditCheckbox: FC<Props> = ({ label, name, value, defaultValue, setState }) => {


    const handleProject = (e: ChangeEvent<HTMLInputElement>) => {

        setState((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })

    }

    return (
        <div className='w-full py-6 px-5 border bg-white'>
            <label>
                <input className='mr-2' type='checkbox' name={name} value={value} checked={defaultValue === value ? true : false} onChange={handleProject} />
                {label}
            </label>
        </div>
    )
}
