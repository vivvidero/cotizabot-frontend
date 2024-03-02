import { FC, useContext } from 'react'
import tipologyPlaceholder from '../../assets/images/Rectangle 804.png'
import copy from '../../assets/icons/copy.png'
import del from '../../assets/icons/delete.png'
import { Typology } from '../../types/Tipology'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import UseLocalStorage from '../../hooks/useLocalStorage'
import { NewProjectContext } from '../../context'
import { LoadingContext } from '../../context/LoadingContext'

interface Props {
    typology: Typology
}

export const AdminTipologyCard: FC<Props> = ({ typology }) => {

    const { newProject, setNewProject } = useContext(NewProjectContext)
    const { setLoading } = useContext(LoadingContext)

    const [project, updateProject] = UseLocalStorage('newProject')
    const [spacesSelected, updateSpacesSelected, removeSpaces] = UseLocalStorage('newProjectSpaces')

    const navigate = useNavigate()

    const handleEdit = () => {
        setNewProject((prevState) => {
            return {
                ...prevState,
                activeTypologyId: typology.typologyid
            }
        })
        updateProject({ ...newProject, activeTypologyId: typology.typologyid })
        navigate('/tipology/edit-typology')
    }

    const handleDuplicate = () => {

        api.post(`/typologies/${typology.typologyid}/duplicate`)
            .then((data) => {
                localStorage.setItem('newProject', JSON.stringify({ ...newProject, tipologies: newProject?.tipologies.push(data.data?.typology) }))
                api.get(`/projects/${project.projectid}/typologies`)
                    .then((data) => {
                        setNewProject((prevState) => {
                            return {
                                ...prevState,
                                tipologies: data.data,
                                activeTypologyId: undefined
                            }
                        })
                        updateProject({ ...newProject, activeTypologyId: undefined })
                        removeSpaces()
                    })
                    .then(() => setLoading(false))
            })
            .catch((err) => console.log(err)
            )
    }

    const handleDelete = () => {
        api.delete(`/typologies/${typology.typologyid}`)
            .then(() => {
                api.get(`/projects/${project.projectid}/typologies`)
                    .then((data) => {
                        setNewProject((prevState) => {
                            return {
                                ...prevState,
                                tipologies: data.data,
                                activeTypologyId: undefined
                            }
                        })
                        updateProject({ ...newProject, tipologies: newProject?.tipologies.filter((typo) => typo.typologyid !== typology.typologyid), activeTypologyId: undefined })
                        removeSpaces()
                    })
                    .then(() => setLoading(false))
            })
            .catch((err) => console.log(err)
            )
    }

    return (
        <div className='rounded-3xl bg-white p-2 flex flex-col '>
            <div className='rounded-3xl overflow-hidden'>
                <img src={tipologyPlaceholder} alt='Imagen Tipologgia' className='w-full h-40 object-contain' />
            </div>
            <div className='font-outfit text-base font-normal flex flex-col gap-2'>
                <h4 className='text-xl'>
                    {typology.typologyname}
                </h4>
                <div className='flex items-center justify-between'>
                    <p> Área Construida</p>
                    <div className='bg-honeydew px-2 rounded-full w-16 flex justify-center items-center'>
                        <p>{typology.builtarea} m2 </p>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <p> Área privada</p>
                    <div className='bg-honeydew px-2 rounded-full w-16 flex justify-center items-center'>
                        <p>{typology.privatearea} m2</p>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <p> Tipo</p>
                    <div className='bg-honeydew px-2 rounded-full w-16 flex justify-center items-center'>
                        <p>{typology.type}</p>
                    </div>
                </div>
            </div>
            <div className='flex gap-2 my-3'>
                <button className='border border-vivvi px-6 rounded-full h-8 flex-1 hover:bg-dorado transition-all duration-300' onClick={handleEdit}>
                    Editar
                </button>
                <button className='border border-vivvi rounded-full w-8 h-8 p-2 hover:bg-dorado transition-all duration-300' onClick={handleDuplicate}>
                    <img src={copy} className='w-full' />
                </button>
                <button className='border border-vivvi rounded-full w-8 h-8 p-2 hover:bg-dorado transition-all duration-300' onClick={handleDelete}>
                    <img src={del} className='w-full' />
                </button>
            </div>
            <div>
                <button className='border border-vivvi px-6 rounded-full h-8 w-full hover:bg-dorado transition-all duration-300' onClick={handleEdit}>
                Advertencia tecnica
                </button>
            </div>
        </div>
    )
}
