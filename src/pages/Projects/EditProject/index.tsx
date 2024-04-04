import { useNavigate, useParams } from 'react-router-dom'
import { MainLayout, MiddleLayout } from '../../../Layout'
import { LinkButton, SubmitButton } from '../../../components'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { LoadingContext } from '../../../context/LoadingContext'
import api, { fetchProjectById } from '../../../api/projects'
import { Projects } from '../../../types/Projects/Projects'

export const EditProject = () => {

    const navigate = useNavigate()
    const { setLoading } = useContext(LoadingContext)
    const { projectid } = useParams()
    const [projectToEdit, setProjectToEdit] = useState<Projects>({
        projectname: '',
        constructorname: '',
        city: '',
        neighborhood: '',
        address: '',
        type: '',
        projectid: projectid ? parseInt(projectid) : undefined
    })


    const handleEdit = () => {
        setLoading(true)
        try {
            api.put(`/project/${projectid}`, projectToEdit)
                .then(() => {
                    setLoading(false)
                    navigate(`/new-project/${projectid}`)
                })
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (projectid) {
            setLoading(true)
            fetchProjectById(projectid)
                .then((data) => {
                    setProjectToEdit(() => {
                        return {
                            ...data.data.project
                        }
                    })
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                }
                )
        }
    }, [projectid, setProjectToEdit, setLoading])

    const handleProject = (e: ChangeEvent<HTMLInputElement>) => {
        setProjectToEdit((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <MainLayout>

            <MiddleLayout>
                <h2 className='mb-16 text-3xl text-vivvi font-outfit'>Editar Proyecto</h2>
                <form className='flex flex-col gap-6 w-1/3'>
                    <input className='py-6 px-5 border' type='text' placeholder={'Nombre del proyecto'} name={'projectname'} defaultValue={projectToEdit?.projectname} onChange={handleProject} />
                    <input className='py-6 px-5 border' type='text' placeholder={'Constructora'} name={'constructorname'} defaultValue={projectToEdit?.constructorname} onChange={handleProject} />
                    <input className='py-6 px-5 border' type='text' placeholder={'Ciudad'} name={'city'} defaultValue={projectToEdit?.city} onChange={handleProject} />
                    <input className='py-6 px-5 border' type='text' placeholder={'Barrio'} name={'neighborhood'} defaultValue={projectToEdit?.neighborhood} onChange={handleProject} />
                    <input className='py-6 px-5 border' type='text' placeholder={'Dirección'} name={'address'} defaultValue={projectToEdit?.address} onChange={handleProject} />
                    {/* <EditInput placeholder={'Nombre del proyecto'} name={'projectname'} value={projectToEdit?.projectname || ''} setState={setProjectToEdit} />
                    <EditInput placeholder={'Constructora'} name={'constructorname'} value={projectToEdit?.constructorname} /> */}
                    {/*  <EditInput placeholder={'Ciudad'} name={'city'} value={projectToEdit?.city} />
                    <EditInput placeholder={'Barrio'} name={'neighborhood'} value={projectToEdit?.neighborhood} />
                    <EditInput placeholder={'Dirección'} name={'address'} value={projectToEdit?.address} /> */}
                    <div className='flex gap-8'>
                        <div className='w-full py-6 px-5 border bg-white'>
                            <label>
                                <input className='mr-2' type='checkbox' name={'type'} value={'VIS'} checked={projectToEdit?.type === 'VIS' ? true : false} onChange={handleProject} />
                                {'VIS'}
                            </label>
                        </div>
                        <div className='w-full py-6 px-5 border bg-white'>
                            <label>
                                <input className='mr-2' type='checkbox' name={'type'} value={'Usado'} checked={projectToEdit?.type === 'Usado' ? true : false} onChange={handleProject} />
                                {'Usado'}
                            </label>
                        </div>
                        {/* <EditCheckbox label={'VIS'} name={'type'} value={'VIS'} defaultValue={projectToEdit.type} setState={setProjectToEdit} />
                        <EditCheckbox label={'Usado'} name={'type'} value={'Usado'} defaultValue={projectToEdit.type} setState={setProjectToEdit} /> */}
                    </div>
                    <div className='flex gap-4 justify-center'>
                        <SubmitButton bg={'golden'} handle={handleEdit}  >
                            <p>Guardar edición</p>
                        </SubmitButton>
                        <LinkButton link={`/new-project/${projectid}`} bg=''>
                            Cancelar
                        </LinkButton>
                    </div>
                </form>
            </MiddleLayout>
        </MainLayout>
    )
}
