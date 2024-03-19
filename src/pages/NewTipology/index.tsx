import { MainLayout } from '../../Layout'
import { AdminProgressBar, LinkButton, NewTipologyModal, SubmitButton } from '../../components'
import addTipology from '../../assets/icons/add-tipology.png'
import delOrange from '../../assets/icons/Delete-orange.png'
import { ChangeEvent, useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import check from '../../assets/icons/check.png'
import { Typology } from '../../types/Tipology'
import api from '../../api'
import { LoadingContext } from '../../context/LoadingContext'

export const AdminNewTipology = () => {
    const [errorMessage, setErrorMessage] = useState(''); // Manejar el error al intentar guardar una tipologia sin agregar datos
    const { setLoading } = useContext(LoadingContext)
    const { projectid } = useParams()
    const [newTypology, setNewTypology] = useState<Typology>({
        typologyname: '',
        type: '',
        privatearea: '',
        builtarea: '',
        blueprints: '',
        revitmodel: '',
        video: '',
        image: ''
    })
    const [formDataTypo, setFormDataTypo] = useState<FormData>(new FormData())
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
    /*   */
    const handleTypologyImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return
        }
        const formData = new FormData()
        formData.append('imagen', file);
        setFormDataTypo(formData)
        if (file) {
            // Leer el contenido del archivo y mostrar una vista previa de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }
    /**
       * Guarda la nueva tipología en el servidor.
       */
    const handleSaveTypology = () => {
        setLoading(true);

        // Verificar si al menos los primeros cuatro campos obligatorios están llenos
        if (
            !newTypology.typologyname ||
            !newTypology.type ||
            !newTypology.privatearea ||
            !newTypology.builtarea
        ) {
            // Mostrar un mensaje de error al usuario
            setErrorMessage('Debe completar los campos de nombre, tipo, área privada y área construida antes de guardar.');
            setLoading(false);
            return;
        }

        // Continuar con el proceso de guardar la tipología si los primeros cuatro campos están completos
        if (!projectid) {
            // Mostrar un mensaje de error al usuario
            setErrorMessage('No se puede guardar la tipología sin un ID de proyecto.');
            setLoading(false);
            return;
        }

        // Restablecer el mensaje de error
        setErrorMessage('');

        // Continuar con el proceso de guardar la tipología si todos los campos están completos y hay un ID de proyecto
        const jsonBlob = new Blob([JSON.stringify(newTypology)], { type: 'application/json' });
        const jsonBlobProjectId = new Blob([JSON.stringify({ projectId: projectid })], { type: 'application/json' });
        formDataTypo.append('datos', jsonBlob, 'datos.json');
        formDataTypo.append('projectId', jsonBlobProjectId, 'projectId.json');

        try {
            api.post(`/typologies`, formDataTypo)
                .then((data) => {
                    setIsModalOpen(true);
                    setLoading(false);
                    setTimeout(() => {
                        navigate(`/new-project/${projectid}/${data.data.result.typologyid}/space-selector`);
                    }, 3000);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    /**
   * Elimina la vista previa de la imagen seleccionada para la tipología.
   */
    const deleteImagePreview = () => {
        setNewTypology((prevState) => {
            return {
                ...prevState,
                image: ''
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
                        <input name='typologyname' className='py-2 px-5 border' placeholder='Nombre tipología' onChange={handleNewTipology} />
                        <input name='type' className='py-2 px-5 border' placeholder='Tipo' onChange={handleNewTipology} />
                        <input name='privatearea' type='number' className='py-2 px-5 border' placeholder='Área privada' onChange={handleNewTipology} />
                        <input name='builtarea' type='number' className='py-2 px-5 border' placeholder='Área construida' onChange={handleNewTipology} />
                        <input name='blueprints' type='string' className='py-2 px-5 border' placeholder='Cargar planos .pdf' onChange={handleNewTipology} />
                        <input name='revitmodel' type='string' className='py-2 px-5 border' placeholder='Cargar modelo Revit' onChange={handleNewTipology} />
                        <input name='video' type='string' className='py-2 px-5 border' placeholder='Cargar video de la vivienda' onChange={handleNewTipology} />
                    </form>
                    {/* Mostrar el mensaje de error si existe */}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </aside>
                <div className='w-3/4 flex flex-col justify-center items-center px-10'>
                    <div className='bg-white rounded-3xl w-full h-4/5 flex flex-col justify-center items-center overflow-hidden p-40 relative ' >
                        {
                            !imagePreview ?
                                <div className='py-2 px-5 flex flex-col items-center'>
                                    <label htmlFor='image' className='mt-4 flex flex-col items-center cursor-pointer'>
                                        <img src={addTipology} alt={'Tipologia elegida'} className='w-28 object-contain hover:scale-110 duration-200' />
                                        Cargar imagen de la tipología
                                    </label>
                                </div>
                                :
                                <>
                                    <img src={imagePreview} alt={'Tipologia elegida'} className='w-full object-contain ' />
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
