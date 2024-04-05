import { FC } from 'react'

interface Props {
    data: string,
    value: number
}

export const SummaryInput: FC<Props> = ({ data, value }) => {
    return (
        <div className="flex justify-between items-center p-2 bg-white rounded-xl font-medium">
            <p> {data} </p>
            <div className="bg-honeydew p-1 px-2 rounded-2xl">
                <p>{value} m2</p>
            </div>
        </div>
    )
}
