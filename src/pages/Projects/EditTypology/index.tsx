import { MainLayout } from '../../../Layout'
import { AdminProgressBar, LinkButton, NewTipologyModal, SubmitButton } from '../../../components'
import addTipology from '../../../assets/icons/add-tipology.png'
import delOrange from '../../../assets/icons/Delete-orange.png'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import check from '../../../assets/icons/check.png'
import { Typology } from '../../../types/Projects/Tipology'
import api from '../../../api/projects'
import { LoadingContext } from '../../../context/LoadingContext'
import { NewProjectContext } from '../../../context'

export const EditTypology = () => {
    const { newProject } = useContext(NewProjectContext);
    const [formDataTypo, setFormDataTypo] = useState(new FormData());

    const [editTypology, setEditTypology] = useState<Typology>({
        typologyname: '',
        type: '',
        privatearea: '',
        builtarea: '',
        blueprints: '',
        revitmodel: '',
        video: '',
        image: ''
    });

    const { projectid, typologyid } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/projects/${projectid}/typologies`);
                const projectToEdit = response.data.find((typology: Typology) => typology.typologyid === newProject.activeTypologyId);
                if (projectToEdit) {
                    setEditTypology({
                        typologyname: projectToEdit.typologyname,
                        type: projectToEdit.type,
                        privatearea: projectToEdit.privatearea,
                        builtarea: projectToEdit.builtarea,
                        blueprints: projectToEdit.linkpdf,
                        revitmodel: projectToEdit.linkdocument,
                        video: projectToEdit.linkvideo,
                        image: projectToEdit.image,
                        projectid: newProject.projectid
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [newProject.activeTypologyId, newProject.projectid, projectid]);

    const { setLoading } = useContext(LoadingContext);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleEditTypology = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditTypology((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTypologyImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            console.log("No hay archivos");
            return;
        }

        const formData = new FormData();
        formData.append('imagen', file);
        setFormDataTypo(formData);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveEditedTypology = async () => {
        setLoading(true);

        if (!projectid || !typologyid) {
            console.log("NO HAY ID DE PROYECTO O DE TIPOLOGIA ACTIVA");
            return;
        }

        const jsonBlob = new Blob([JSON.stringify(editTypology)], { type: 'application/json' });
        const jsonBlobProjectId = new Blob([JSON.stringify({ projectId: projectid, typologyId: typologyid })], { type: 'application/json' });
        formDataTypo.append('datos', jsonBlob, 'datos.json');
        formDataTypo.append('projectId', jsonBlobProjectId, 'projectId.json');

        try {
            const response = await api.post(`/typologies`, formDataTypo);
            console.log(response.data);
            setIsModalOpen(true);
            setLoading(false);
            setTimeout(() => {
                navigate(`/new-project/${projectid}`);
            }, 3000);
        } catch (error) {
            console.error('Error saving edited typology:', error);
            setLoading(false);
        }
    };

    const deleteImagePreview = () => {
        setEditTypology((prevState) => ({
            ...prevState,
            image: ''
        }));
        setImagePreview('');
    };

    return (
        <MainLayout>
            <AdminProgressBar progress={2} />
            <article className='w-full pt-5 flex flex-auto'>
                <aside className='bg-white w-1/4 flex flex-col border border-platinum flex-1 py-7 px-10'>
                    <h3 className='font-outfit mb-12 text-2xl text-vivvi'>Editar Tipología</h3>
                    <form className='w-full flex flex-col gap-7 flex-1'>
                        <input defaultValue={editTypology.typologyname} name='typologyName' className='py-2 px-5 border' placeholder='Nombre tipología' onChange={handleEditTypology} />
                        <input defaultValue={editTypology.type} name='type' className='py-2 px-5 border' placeholder='Tipo' onChange={handleEditTypology} />
                        <input defaultValue={editTypology.privatearea} name='privateArea' type='number' className='py-2 px-5 border' placeholder='Área privada' onChange={handleEditTypology} />
                        <input defaultValue={editTypology.builtarea} name='builtArea' type='number' className='py-2 px-5 border' placeholder='Área construida' onChange={handleEditTypology} />
                        <input defaultValue={editTypology.blueprints} name='blueprints' type='string' className='py-2 px-5 border' placeholder='Cargar planos .pdf' onChange={handleEditTypology} />
                        <input defaultValue={editTypology.revitmodel} name='revitmodel' type='string' className='py-2 px-5 border' placeholder='Cargar modelo Revit' onChange={handleEditTypology} />
                        <input defaultValue={editTypology.video} name='video' type='string' className='py-2 px-5 border' placeholder='Cargar video de la vivienda' onChange={handleEditTypology} />
                    </form>
                </aside>
                <div className='w-3/4 flex flex-col justify-center items-center px-10'>
                    <div className='bg-white rounded-3xl w-full h-4/5 flex flex-col justify-center items-center overflow-hidden p-40 relative'>
                        {!imagePreview ? (
                            <div className='py-2 px-5 flex flex-col items-center'>
                                <label htmlFor='image' className='mt-4 flex flex-col items-center cursor-pointer'>
                                    <img src={addTipology} alt={'Tipologia elegida'} className='w-28 object-contain' />
                                    Cargar imagen de la tipología
                                </label>
                            </div>
                        ) : (
                            <>
                                <img src={imagePreview} alt={'Tipologia elegida'} className='w-full object-contain' />
                                <div className='absolute bottom-5 right-5 cursor-pointer' onClick={deleteImagePreview}>
                                    <img src={delOrange} className='z-20 w-12 ' alt='' />
                                </div>
                            </>
                        )}
                        <input type='file' id='image' name='image' onChange={handleTypologyImage} className='hidden' />
                    </div>
                    <div className='flex w-full gap-5 justify-end items-center mt-9'>
                        <SubmitButton bg={'golden'} handle={handleSaveEditedTypology}>
                            <p>Actualizar Tipologia</p>
                        </SubmitButton>
                        <LinkButton link={"/"} bg=''>
                            Cancelar
                        </LinkButton>
                    </div>
                    <NewTipologyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <h2 className='text-3xl font-roboto mb-4'>Tipología Editada</h2>
                        <div>
                            <img src={check} alt='check' />
                        </div>
                    </NewTipologyModal>
                </div>
            </article>
        </MainLayout>
    );
};
