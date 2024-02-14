import { ChangeEvent, FC, useContext } from 'react'
import { NewProjectContext } from '../../../context'

interface Props {
  placeholder: string
  name: string
  value: string
}

export const AdminInput: FC<Props> = ({ placeholder, name, value }) => {

  const { setNewProject, newProject } = useContext(NewProjectContext)

  const handleProject = (e: ChangeEvent<HTMLInputElement>) => {

    setNewProject((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
    localStorage.setItem('newProject', JSON.stringify({ ...newProject, [e.target.name]: e.target.value }));
  }

  return (
    <input className='py-6 px-5 border' type='text' placeholder={placeholder} name={name} value={value} onChange={handleProject} />
  )
}
