import { ChangeEvent, FC, useContext } from 'react'
import { NewProjectContext } from '../../../context'

interface Props {
    label: string
    name: string
    value: string
}

export const AdminCheckbox: FC<Props> = ({ label, name, value }) => {

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
        <div className='w-full py-6 px-5 border bg-white'>
            <label>
                <input className='mr-2' type='checkbox' name={name} value={value} onChange={handleProject} />
                {label}
            </label>
        </div>
    )
}
