import { SearchBar, SupplieRow } from ".."



export const AdminBudgetsSupplies = () => {
    return (
        <article className="w-full">
            <SearchBar lookingFor={"Insumo"} />
            <form className="w-full font-roboto text-xl">
                <SupplieRow supplieName={"Cemento gris x 50 kg"} />
                <SupplieRow supplieName={"Estuco masilla 4.5 gal 28 kg"} />
                <SupplieRow supplieName={"Yeso blanco 5 kilos"} />
                <SupplieRow supplieName={"Pintura tipo 1 x caneca"} />
                <SupplieRow supplieName={"Cinta de enmascarar 24 mm x 40 metros"} />
                <SupplieRow supplieName={"Soldadura solvente para pvc"} />
            </form>
        </article>
    )
}
