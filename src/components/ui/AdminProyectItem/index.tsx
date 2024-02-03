import { useContext, useState } from 'react'
import pointMenu from '../../../assets/icons/points.png'
import axios from 'axios'
import api from '../../../api'
import { NewProjectContext } from '../../../context'
import { useNavigate } from 'react-router-dom'


export const AdminProyectItem = ({ project }) => {

    const [dropDown, setDropDown] = useState(false)
    const {setNewProject} = useContext(NewProjectContext)
    const navigate = useNavigate()
    const handleDelete = () => {
        axios.post(`${api}/delete-project`, { projectId: project.projectid })
            .then((data) => console.log(data.data))
    }

    const handleEdit = () => {
        setNewProject(project)
        localStorage.setItem('newProject', JSON.stringify(project) )
        navigate("new-project")
    }

    return (
        <div className='grid grid-cols-12 shadow-lg px-5 py-7 rounded-xl font-roboto text-lg bg-white'>
            <div className='col-span-4'> {project.projectname} </div>
            <div><p>01  </p></div>
            <div><p>C</p></div>
            <div className='col-span-2'><p>{project.constructorname} </p></div>
            <div><p>Vis</p></div>
            <div className='col-span-2'><p>27.58</p></div>
            <div className='col-span-1 flex flex-col items-center justify-end relative' >
                <button onClick={() => setDropDown(!dropDown)} className='w-1/4 flex items-center justify-center' >
                    <img src={pointMenu} alt='menu' />
                </button>
                <ul className={`overflow-hidden rounded-lg bg-white absolute right-20  ${dropDown ? 'block' : 'hidden'}`}>
                    <li className='text-gray-800 hover:bg-indigo-500 hover:text-white px-4 py-2 cursor-pointer' onClick={handleEdit}>Editar</li>
                    <li className='text-gray-800 hover:bg-indigo-500 hover:text-white px-4 py-2 cursor-pointer' onClick={handleDelete}>Eliminar</li>
                </ul>
            </div>
        </div>
    )
}
