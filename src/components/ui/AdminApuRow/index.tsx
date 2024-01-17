import { AdminApuCard } from '..'

export const AdminApuRow = () => {
    return (
        <div className='flex flex-col gap-7 mb-14'>
            <h4 className="font-roboto font-[500] text-xl text-vivvi">Pisos</h4>
            <div className="grid grid-cols-4 gap-5">
                <AdminApuCard />
                <AdminApuCard />
                <AdminApuCard />
                <AdminApuCard />
                
            </div>
        </div>
    )
}
