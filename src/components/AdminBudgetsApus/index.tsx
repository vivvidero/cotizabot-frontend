import { AdminApuRow, SearchBar } from ".."

export const AdminBudgetsApus = () => {
    return (
        <article className="w-full">
            <SearchBar lookingFor="APU" />
            <AdminApuRow />
            <AdminApuRow />
            <AdminApuRow />
            <AdminApuRow />
        </article>
    )
}
