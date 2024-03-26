import { NoDataBox } from "../../ui/NoDataBox"

export const ApusList = () => {
    return (
        <article className="w-full flex flex-col gap-8">
            <table className="bg-vivvi text-white font-medium font-roboto flex justify-between gap-8 py-2 rounded-md px-10">
                <th>

                </th>
                <th>
                    Código
                </th>
                <th>
                    Nombre
                </th>
                <th className="flex-1 text-start">
                    Unidad
                </th>
                <th>
                    Valor Total
                </th>
            </table>
            <NoDataBox data={"APU"} link="create" />
        </article>
    )
}
