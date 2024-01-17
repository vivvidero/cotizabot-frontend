import { useContext, useState } from "react";
import { MainLayout, MiddleLayout } from "../../Layout"
import { LoadingContext } from "../../context/LoadingContext";
import { FinalCreationModal, LinkButton, Spinner } from "../../components";
import check from "../../assets/icons/check.png"

export const AdminNewSupplie = () => {

    const [isSaveSupplieModalOpen, setIsSaveSupplieModalOpen] = useState(false);
    const { loading, setLoading } = useContext(LoadingContext)

    const handleSaveSupplie = (e) => {
        e.preventDefault()
        setIsSaveSupplieModalOpen(true)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 5000);
        // Aca hacer POST de nuevo APU en el futuro

    }

    return (
        <MainLayout>
            <MiddleLayout>
                <h2 className="text-2xl text-vivvi font-medium">Nuevo Insumo</h2>
                <form className="flex flex-col gap-6 w-6/12 my-6">
                    <label className=" p-4 bg-white border border-platinum">
                        <input type="text" name={""} className="w-full" placeholder='Nombre del insumo' />
                    </label>
                    <label className=" p-4 bg-white border border-platinum">
                        <input type="text" name={""} className="w-full" placeholder='Referencia (Ej: “gris”)' />
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
                        Unidad de venta
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
                        Unidad de medida
                    </label>
                    <label className=" p-4 bg-white border border-platinum">
                        <input type="text" name={""} className="w-full" placeholder='Cantidad' />
                    </label>
                    <label className=" p-4 bg-white border border-platinum">
                        <input type="text" name={""} className="w-full" placeholder='Código ERP' />
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
                        Categoria
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
                        <input type="text" name={""} className="w-full" placeholder='APU' />
                    </label>
                    <div className=" flex gap-5">
                        <button onClick={handleSaveSupplie} className={`flex items-center justify-center gap-2 py-2 w-52 h-8 rounded-full text-lg hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi`}>
                            Guardar
                        </button>
                        <LinkButton link="/" bg="">
                            Cancelar
                        </LinkButton>
                    </div>
                </form>

                <FinalCreationModal isOpen={isSaveSupplieModalOpen} onClose={() => setIsSaveSupplieModalOpen(false)}>
                    {loading
                        ?
                        <Spinner />
                        :
                        <>
                            <h2 className='text-3xl font-roboto mb-4'>Proyecto guardado 🔥</h2>
                            <div>
                                <img src={check} alt='check' />
                            </div>
                            <LinkButton link="/admin/budgets/insumos" bg="golden">
                                Finalizar
                            </LinkButton>
                        </>
                    }
                </FinalCreationModal>
            </MiddleLayout>
        </MainLayout>
    )
}
