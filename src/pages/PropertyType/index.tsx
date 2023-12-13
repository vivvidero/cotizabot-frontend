import { MainLayout } from "../../Layout"
import { LinkButton } from "../../components"

export const PropertyType = () => {
    return (
        <MainLayout>
            <form className="px-96 py-16 flex flex-col gap-11">
                <article>
                    <h2 className="font-outfit font-semibold text-3xl text-vivvi mb-11">Qué tipo de propiedad tienes?</h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 p-6 border border-platinum rounded bg-white ">
                            <input type="checkbox" className="w-5 h-5 rounded-full bg-white align-middle border border-black appearance-none outline-none cursor-pointer checked:bg-slate-600 " />
                            <label className="font-roboto text-xl">Vivienda VIS</label>
                        </div>
                        <div className="flex items-center gap-2 p-6 border border-platinum rounded bg-white ">
                            <input type="checkbox" className="w-5 h-5 rounded-full bg-white align-middle border border-black appearance-none outline-none cursor-pointer checked:bg-slate-600 " />
                            <label className="font-roboto text-xl">Vivienda VIS</label>
                        </div>
                    </div>
                </article>
                <LinkButton link="/project-feature" bg="golden">    
                    Continuar
                </LinkButton>
            </form>
        </MainLayout>
    )
}
