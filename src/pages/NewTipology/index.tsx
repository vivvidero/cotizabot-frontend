import { MainLayout } from '../../Layout'
import { AdminProgressBar, LinkButton, NewTipologyModal, SubmitButton } from '../../components'
import addTipology from '../../assets/icons/add-tipology.png'
import delOrange from '../../assets/icons/Delete-orange.png'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import check from '../../assets/icons/check.png'
import { Typology } from '../../types/Tipology'
import api from '../../api'
import { LoadingContext } from '../../context/LoadingContext'
import { NewProjectContext } from '../../context'

export const AdminNewTipology = () => {

    const { newProject, setNewProject } = useContext(NewProjectContext)

    const [newTypology, setNewTypology] = useState<Typology>({
        typologyName: '',
        type: '',
        privateArea: '',
        builtArea: '',
        blueprints: '',
        revitModel: '',
        video: '',
        image: null
    })

    useEffect(() => {
        setNewTypology((prevState) => {
            return {
                ...prevState,
                projectid: newProject.projectId
            }
        })

    }, [])

    const { setLoading } = useContext(LoadingContext)
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleNewTipology = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTypology((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleTypologyImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append(e.target.name, file);
        setNewTypology((prevState: Typology) => {
            return {
                ...prevState,
                [e.target.name]: formData
            }
        }
        )
        if (file) {
            // Leer el contenido del archivo y mostrar una vista previa de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSaveTypology = () => {
        setLoading(true)

        if (!newProject.projectid) {
            console.log("NO HAY ID DE PROYECTO");
            return
        }

        try {
            api.post(`/typologies`, { typologyId: newProject?.activeTypologyId, newTypology})
                .then((data) => {
                    console.log(data.data);
                    setNewProject((prevState) => {
                        return {
                            ...prevState,
                            activeTypologyId: data.data.typology.typologyid
                        }
                    })
                    localStorage.setItem('newProject', JSON.stringify({ ...newProject, activeTypologyId: data.data.typology.typologyid }))
                    setIsModalOpen(true)
                    setLoading(false)
                    setTimeout(() => {
                        navigate('/new-project/space-selector');
                    }, 3000);
                })

        } catch (error) {
            console.log(error);

        }
        setLoading(false)
    }

    const deleteImagePreview = () => {
        setNewTypology((prevState) => {
            return {
                ...prevState,
                image: null
            }
        })
        setImagePreview('')
    }



    return (
        <MainLayout>
            <AdminProgressBar progress={2} />
            <article className='w-full h-full pt-5 flex' >
                <aside className='bg-white w-1/4 flex flex-col border border-platinum flex-1 py-7 px-10'>
                    <h3 className='font-outfit mb-12 text-2xl text-vivvi'>Nueva Tipología</h3>
                    <form className='w-full flex flex-col gap-7 flex-1'>
                        <input name='typologyName' className='py-2 px-5 border' placeholder='Nombre tipología' onChange={handleNewTipology} />
                        <input name='type' className='py-2 px-5 border' placeholder='Tipo' onChange={handleNewTipology} />
                        <input name='privateArea' type='number' className='py-2 px-5 border' placeholder='Área privada' onChange={handleNewTipology} />
                        <input name='builtArea' type='number' className='py-2 px-5 border' placeholder='Área construida' onChange={handleNewTipology} />
                        <input name='blueprints' type='string' className='py-2 px-5 border' placeholder='Cargar planos .pdf' onChange={handleNewTipology} />
                        <input name='revitModel' type='string' className='py-2 px-5 border' placeholder='Cargar modelo Revit' onChange={handleNewTipology} />
                        <input name='video' type='string' className='py-2 px-5 border' placeholder='Cargar video de la vivienda' onChange={handleNewTipology} />
                        {/* <InputFile setNewTypology={setNewTypology} name={'blueprints'} label={'Cargar planos .pdf'} />
                        <InputFile setNewTypology={setNewTypology} name={'revitModel'} label={'Cargar modelo Revit'} />
                        <InputFile setNewTypology={setNewTypology} name={'video'} label={'Cargar video de la vivienda'} /> */}
                    </form>
                </aside>
                <div className='w-3/4 flex flex-col justify-center items-center px-10'>
                    <div className='bg-white rounded-3xl w-full h-4/5 flex flex-col justify-center items-center overflow-hidden p-40 relative' >
                        {
                            !imagePreview ?
                                <div className='py-2 px-5 flex flex-col items-center'>
                                    <label htmlFor='image' className='mt-4 flex flex-col items-center cursor-pointer'>
                                        <img src={addTipology} alt={'Tipologia elegida'} className='w-28 object-contain' />
                                        Cargar imagen de la tipología
                                    </label>
                                </div>
                                :
                                <>
                                    <img src={imagePreview} alt={'Tipologia elegida'} className='w-full object-contain' />
                                    <div className='absolute bottom-5 right-5 cursor-pointer' onClick={deleteImagePreview}>
                                        <img src={delOrange} className='z-20 w-12 ' alt='' />
                                    </div>
                                </>
                        }
                        <input type='file' id='image' name='image' onChange={handleTypologyImage} className='hidden' />
                    </div>
                    <div className='flex w-full gap-5 justify-end items-center mt-9'>
                        <SubmitButton bg={'golden'} handle={handleSaveTypology}>
                            <p>Guardar y continuar</p>
                        </SubmitButton>
                        <LinkButton link={"/"} bg=''>
                            Cancelar
                        </LinkButton>
                    </div>
                    <NewTipologyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <h2 className='text-3xl font-roboto mb-4'>Tipología guardada</h2>
                        <div>
                            <img src={check} alt='check' />
                        </div>
                    </NewTipologyModal>
                </div>
            </article>
        </MainLayout>
    )
}
