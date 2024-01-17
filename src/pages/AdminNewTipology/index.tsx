import { MainLayout } from '../../Layout'
import { AdminProgressBar, LinkButton, NewTipologyModal } from '../../components'
import addTipology from '../../assets/icons/add-tipology.png'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import check from '../../assets/icons/check.png'
import { Tipology } from '../../types/Tipology'



export const AdminNewTipology = () => {

    const [newTipology, setNewTipology] = useState<Tipology>({
        tipologyName: '',
        tipologyType: '',
        tipologyPrivateArea: '',
        tipologyConstructedArea: '',
        tipologyImage: null
    })
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleNewTipology = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTipology((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleTipologyImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        setNewTipology((prevState) => {
            return {
                ...prevState,
                tipologyImage: file
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

    const handleSaveTipology = () => {
        setIsModalOpen(true)
        console.log(newTipology);
        // Aca hacer POST de Tipology en el futuro
        setTimeout(() => {
            navigate('/new-project/tipology');
        }, 5000);
    }

    return (
        <MainLayout>
            <AdminProgressBar progress={2} />
            <article className='w-full h-full pt-5 flex' >
                <aside className='bg-white w-1/4 flex flex-col border border-platinum flex-1 py-7 px-10'>
                    <h3 className='font-outfit mb-12 text-2xl text-vivvi'>Nueva Tipologías</h3>
                    <form className='w-full flex flex-col gap-7 flex-1'>
                        <input name='tipologyName' className='py-2 px-5 border' placeholder='Nombre tipología' onChange={handleNewTipology} />
                        <input name='tipologyType' className='py-2 px-5 border' placeholder='Tipo' onChange={handleNewTipology} />
                        <label>
                            <input name='tipologyPrivateArea' type='number' className='py-2 px-5 border' placeholder='Área privada' onChange={handleNewTipology} />
                            M2
                        </label>
                        <label>
                            <input name='tipologyConstructedArea' type='number' className='py-2 px-5 border' placeholder='Área construida' onChange={handleNewTipology} />
                            M2
                        </label>
                    </form>
                </aside>
                <div className='w-3/4 flex flex-col justify-center items-center px-10'>
                    <div className='bg-white rounded-3xl w-full h-4/5 flex flex-col justify-center items-center overflow-hidden'>

                        <div className='flex justify-center items-center overflow-hidden'>
                            <img src={imagePreview ? imagePreview : addTipology} alt={'Tipologia elegida'} className='w-full object-contain' />
                        </div>
                        <label>Cargar imagen de la tipología</label>
                        <input type='file' name='tipologyImage' onChange={handleTipologyImage} />

                    </div>
                    <div className='flex w-full gap-5 justify-end items-center mt-9'>
                        <button className='bg-dorado flex items-center justify-center gap-2 px-5 py-2 w-52 rounded-full text-lg hover:scale-95 duration-200 border border-vivvi' onClick={handleSaveTipology}>
                            Guardar y continuar
                        </button>
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
