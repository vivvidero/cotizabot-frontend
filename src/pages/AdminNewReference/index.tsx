import { MainLayout, MiddleLayout } from "../../Layout"
import { AdminModalApuCard, FinalCreationModal, LinkButton, SearchBar, Spinner } from "../../components"
import { useContext, useState } from "react";
import { SearchApuModal } from "../../components/ui/SearchApuModal";
import close from '../../assets/icons/close.png'
import check from '../../assets/icons/check.png'

import { LoadingContext } from "../../context/LoadingContext";

export const AdminNewReference = () => {
    const [isSearchApuModalOpen, setIsSearchApuModalOpen] = useState(false);
    const [isSaveReferenceModalOpen, setIsSaveReferenceModalOpen] = useState(false);
    const { loading, setLoading } = useContext(LoadingContext)

    const handleSaveReference = (e) => {
        e.preventDefault()
        setIsSaveReferenceModalOpen(true)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 5000);
        // Aca hacer POST de nuevo APU en el futuro

    }

    return (
        <MainLayout>
            <MiddleLayout>
                <h2 className="text-2xl text-vivvi font-medium">Nueva referencia</h2>
                <form className="flex flex-col gap-6 w-6/12 my-6">
                    <label className=" p-4 bg-white border border-platinum">
                        <input type="text" name={""} className="w-full" placeholder='Nombre de la referencia' />
                    </label>
                    <label className=" p-4 bg-white border border-platinum flex items-center" >
                        <select name='tipology'>
                            <option>
                                1
                            </option>
                            <option>
                                2
                            </option>
                            <option>
                                3
                            </option>
                        </select>
                        Categoría
                    </label>
                    <label className=" p-4 bg-white border border-platinum">
                        <input type="text" name={""} className="w-full" placeholder='APU' onClick={() => setIsSearchApuModalOpen(true)} />
                    </label>
                    <label className=" p-4 bg-white border border-platinum flex items-center" >
                        <select name='tipology'>
                            <option>
                                1
                            </option>
                            <option>
                                2
                            </option>
                            <option>
                                3
                            </option>
                        </select>
                        Espacio
                    </label>
                    <label className=" p-4 bg-white border border-platinum">
                        <input type="text" name={""} className="w-full" placeholder='Precio' />
                    </label>
                    <div className=" flex gap-5">
                        <button onClick={handleSaveReference} className={`flex items-center justify-center gap-2 py-2 w-52 h-8 rounded-full text-lg hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi`}>
                            Guardar
                        </button>
                        <LinkButton link="/" bg="">
                            Cancelar
                        </LinkButton>
                    </div>
                </form>
                <SearchApuModal isOpen={isSearchApuModalOpen} onClose={() => setIsSearchApuModalOpen(false)}>
                    <div className="absolute border border-black top-5 right-5 w-8 h-8 grid place-content-center rounded-full cursor-pointer" onClick={() => setIsSearchApuModalOpen(false)}>
                        <img src={close} alt="close" />
                    </div>
                    <SearchBar lookingFor="APU" />
                    <div className="w-full">
                        <h4 className="font-roboto font-medium text-xl text-vivvi">Pisos</h4>
                    </div>

                    <div className="grid grid-cols-4 gap-5 w-full">
                        <AdminModalApuCard />
                        <AdminModalApuCard />
                        <AdminModalApuCard />
                    </div>
                </SearchApuModal>
                <FinalCreationModal isOpen={isSaveReferenceModalOpen} onClose={() => setIsSaveReferenceModalOpen(false)}>
                    {loading
                        ?
                        <Spinner />
                        :
                        <>
                            <h2 className='text-3xl font-roboto mb-4'>Proyecto guardado 🔥</h2>
                            <div>
                                <img src={check} alt='check' />
                            </div>
                            <LinkButton link="/admin/budgets/referencias" bg="golden">
                                Finalizar
                            </LinkButton>
                        </>
                    }
                </FinalCreationModal>
            </MiddleLayout>
        </MainLayout>
    )
}
