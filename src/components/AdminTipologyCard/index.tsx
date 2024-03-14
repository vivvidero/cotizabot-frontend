import { Dispatch, FC, SetStateAction, useContext, useEffect } from 'react'
import copy from '../../assets/icons/copy.png'
import del from '../../assets/icons/delete.png'
import typologyPlaceholder from '../../assets/images/Rectangle 804.png'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'
import { NewProjectContext } from '../../context'
import { LoadingContext } from '../../context/LoadingContext'



interface TypologiesData {
    typologyid: number;
    projectid: number;
    typologyname: string;
    type: string;
    privatearea: number;
    builtarea: number;
    image: string;
    linkpdf: string;
    linkdocument: string;
    linkvideo: string;
}

interface Props {
    typology: TypologiesData,
    setTypologies: Dispatch<SetStateAction<TypologiesData[]>>
}
export const AdminTipologyCard: FC<Props> = ({ typology, setTypologies }) => {

    const { newProject, setNewProject } = useContext(NewProjectContext)
    const { setLoading } = useContext(LoadingContext)
    const {projectid} = useParams()


    const navigate = useNavigate()

    useEffect(() => {
        const projectStorage = localStorage.getItem('newProject')
        if (projectStorage) {
            const projectlocal = JSON.parse(projectStorage)
            setNewProject((prevState) => {
                return {
                    ...prevState,
                    ...projectlocal
                }
            })
        }
    }, [])

    const handleEdit = () => {
        setNewProject((prevState) => {
            return {
                ...prevState,
                activeTypologyId: typology.typologyid
            }
        })
        localStorage.setItem('newProject', JSON.stringify({ ...newProject, activeTypologyId: typology.typologyid }))
        navigate(`${typology.typologyid}/edit-typology`)
    }

    const handleDuplicate = () => {

        if (!typology.typologyid) {
            console.log("Falta ID de tipologia");
            return
        }

        api.post(`/typologies/${typology.typologyid}/duplicate`)
            .then((data) => {
                localStorage.setItem('newProject', JSON.stringify({ ...newProject, tipologies: newProject?.tipologies ? newProject?.tipologies.push(data.data?.typology) : [] }))
                api.get(`/projects/${projectid}/typologies`)
                    .then((data) => {
                        setTypologies(data.data)
                        localStorage.setItem('newProject', JSON.stringify({ ...newProject, activeTypologyId: undefined }))
                        localStorage.removeItem('newProjectSpaces')

                    })
                    .then(() => setLoading(false))
            })
            .catch((err) => console.log(err)
            )
    }

    const handleDelete = () => {
        api.delete(`/typologies/${typology.typologyid}`)
            .then(() => {
                api.get(`/projects/${projectid}/typologies`)
                    .then((data) => {
                        setTypologies(data.data)
                        localStorage.setItem('newProject', JSON.stringify({ ...newProject, tipologies: newProject?.tipologies ? newProject?.tipologies.filter((typo) => typo.typologyid !== typology.typologyid) : [], activeTypologyId: undefined }))
                        localStorage.removeItem('newProjectSpaces')
                    })
                    .then(() => setLoading(false))
            })
            .catch((err) => console.log(err)
            )
    }

    const handleSummary = () => {
        setNewProject((prevState) => {
            return {
                ...prevState,
                activeTypologyId: typology?.typologyid
            }
        })
        localStorage.setItem('newProject', JSON.stringify({ ...newProject, activeTypologyId: typology?.typologyid }))
        navigate(`/new-project/${projectid}/${typology?.typologyid}/summary`)
    }

    return (
        <div className='rounded-3xl bg-white p-2 flex flex-col '>
            <div className='rounded-3xl overflow-hidden'>
                <img src={typology.image || typologyPlaceholder} alt='Imagen Tipologgia' className='w-full h-40 object-contain' />
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
            <div className='mb-1'>
                <button className='border border-vivvi px-6 rounded-full h-8 w-full hover:bg-dorado transition-all duration-300' onClick={handleEdit}>
                    Advertencia tecnica
                </button>
            </div>
            <div>
                <button className='border border-vivvi px-6 rounded-full h-8 w-full hover:bg-dorado transition-all duration-300' onClick={handleSummary}>
                    Ir a Resumen
                </button>
            </div>
        </div>
    )
}
