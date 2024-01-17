import { FC } from "react"

interface Props {
    progress: number
}
export const AdminProgressBar: FC<Props> = ({ progress }) => {

    return (
        <div className='grid grid-cols-5 gap-2'>
            <div className={`h-3 ${progress > 0 ? 'bg-dorado' : 'bg-timberwolf'}  rounded-r-full`}></div>
            <div className={`h-3 ${progress > 1 ? 'bg-dorado' : 'bg-timberwolf'}  rounded-full`}></div>
            <div className={`h-3 ${progress > 2 ? 'bg-dorado' : 'bg-timberwolf'}  rounded-full`}></div>
            <div className={`h-3 ${progress > 3 ? 'bg-dorado' : 'bg-timberwolf'}  rounded-full`}></div>
            <div className={`h-3 ${progress > 4 ? 'bg-dorado' : 'bg-timberwolf'}  rounded-l-full`}></div>
        </div>
    )
}
