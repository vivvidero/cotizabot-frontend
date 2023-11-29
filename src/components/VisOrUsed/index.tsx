import { Link } from 'react-router-dom'

export const VisOrUsed = () => {
    return (
        <ul className='w-60 flex justify-around text-xl  rounded bg-sky-100 p-2'>
            <Link to={'vis'}>VIS</Link>
            <Link to={'used'}>Usado</Link>
        </ul>
    )
}
