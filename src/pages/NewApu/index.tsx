import { useContext, useState } from "react";
import { MainLayout } from "../../Layout"
import addFile from '../../assets/icons/add-tipology.png'
import check from '../../assets/icons/check.png'
import { FinalCreationModal, LinkButton, Spinner } from "../../components"
import { LoadingContext } from "../../context/LoadingContext";

export const AdminNewApu = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, setLoading } = useContext(LoadingContext)


  const handleSaveApu = () => {
    setIsModalOpen(true)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000);
    // Aca hacer POST de nuevo APU en el futuro

  }

  return (
    <MainLayout>
      <section className="flex h-full">
        <aside className='bg-white w-3/12 flex flex-col border border-platinum flex-1 py-7 px-10'>
          <h3 className="font-outfit text-lg font-[400] mb-5 text-vivvi">Nuevo APU</h3>
          <form className="font-roboto text-lg w-full flex flex-col gap-7 flex-1">
            <input placeholder="Nombre" name="name" className='py-2 px-5 border w-full' />
            <select placeholder="Unidad" name="unit" className='py-2 px-5 border w-full'>
              <option className="text-vivvi">M2</option>
              <option className="text-vivvi">ML</option>
              <option className="text-vivvi">Unidad</option>
              <option className="text-vivvi">Global</option>
            </select>
            <select placeholder="Categoria" name="category" className='py-2 px-5 border w-full'>
              <option className="text-vivvi">M2</option>
              <option className="text-vivvi">ML</option>
              <option className="text-vivvi">Unidad</option>
              <option className="text-vivvi">Global</option>
            </select>
            <textarea className='py-2 px-5 border w-full' placeholder="Descripción técnica" />
            <input placeholder="Cargar referencia con precio" name="name" className='py-2 px-5 border w-full' />
            <input placeholder="Precio mano de obra" name="name" className='py-2 px-5 border w-full' />
            <input placeholder="Precio (Otro)" name="name" className='py-2 px-5 border w-full' />
            <select placeholder="Desperdicio" name="unit" className='py-2 px-5 border w-full' defaultValue={'Desperdicio'}>
              <option className="text-cadet-gray" disabled>Desperdicio</option>
              <option className="text-vivvi">M2</option>
              <option className="text-vivvi">ML</option>
              <option className="text-vivvi">Unidad</option>
              <option className="text-vivvi">Global</option>
            </select>
            <select placeholder="Tipo de cálculo" name="unit" className='py-2 px-5 border w-full' defaultValue={'Tipo de cálculo'}>
              <option className="text-cadet-gray" disabled>Tipo de cálculo</option>
              <option className="text-vivvi">M2</option>
              <option className="text-vivvi">ML</option>
              <option className="text-vivvi">Unidad</option>
              <option className="text-vivvi">Global</option>
            </select>
            <div className="font-roboto">
              <h5 className="text-cadet-gray text-lg font-[400] ">Precio del APU:</h5>
              <p className="font-[500] text-2xl">$0</p>
            </div>
          </form>

        </aside>
        <article className="w-9/12 flex flex-col justify-center items-center px-9 gap-2">
          <div className='bg-white border border-platinum rounded-3xl w-full h-3/5 flex flex-col justify-center items-center overflow-hidden'>

            <div className='flex justify-center items-center overflow-hidden'>
              <img src={addFile} alt={'Tipologia elegida'} className='w-full object-contain' />
            </div>
            <label>Cargar imagen referencia</label>
            <input type='file' name='tipologyImage' />

          </div>
          <div className="grid grid-cols-2 w-full gap-2">
            <div className='bg-white border border-platinum rounded-3xl w-full flex flex-col justify-center items-center overflow-hidden p-4'>
              <div className='flex justify-center items-center overflow-hidden'>
                <img src={addFile} alt={'Tipologia elegida'} className=' object-contain w-10' />
              </div>
              <label>Detalle</label>
              <input type='file' name='tipologyImage' />
            </div>
            <div className='bg-white border border-platinum rounded-3xl w-full flex flex-col justify-center items-center overflow-hidden p-4'>
              <div className='flex justify-center items-center overflow-hidden'>
                <img src={addFile} alt={'Tipologia elegida'} className='w-10 object-contain' />
              </div>
              <label>Tipología</label>
              <input type='file' name='tipologyImage' />
            </div>
          </div>
          <div className="flex justify-end items-center w-full gap-5 mt-7">
            <button className='bg-dorado flex items-center justify-center gap-2 px-5 py-2 w-52 rounded-full text-lg hover:scale-95 duration-200 border border-vivvi' onClick={handleSaveApu}>
              Guardar y continuar
            </button>
            <LinkButton link="/" bg={''}>Cancelar</LinkButton>
          </div>
        </article>
      </section>
      <FinalCreationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {loading
          ?
          <Spinner />
          :
          <>
            <h2 className='text-3xl font-roboto mb-4'>Proyecto guardado 🔥</h2>
            <div>
              <img src={check} alt='check' />
            </div>
            <LinkButton link="/admin/budgets/apus" bg="golden">
              Finalizar
            </LinkButton>
          </>
        }

      </FinalCreationModal>
    </MainLayout>
  )
}
