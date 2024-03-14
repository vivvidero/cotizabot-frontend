import { ChangeEvent, FC, useContext } from 'react'
import { NewProjectContext } from '../../../context'

interface Props {
    placeholder: string
    name: string
    value: string
}

export const EditInput: FC<Props> = ({ placeholder, name, value }) => {

    const { setNewProject } = useContext(NewProjectContext)

    const handleProject = (e: ChangeEvent<HTMLInputElement>) => {

        setNewProject((prevState) => {
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
