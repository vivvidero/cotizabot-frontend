import { Link } from 'react-router-dom'
import arrow from '../../assets/icons/Arrow---Up.png'
import { FC } from 'react'


interface Props {
    cardImage: string,
    linkText: string
}

export const HomeCard: FC<Props> = ({ cardImage, linkText }) => {
    return (
        <>
            <img src={cardImage} className='w-full h-full object-cover' alt="" />
            <div className='absolute bottom-5 right-12 px-5 py-2 flex justify-center items-center bg-white rounded-3xl'>
                <Link to={'/'}> {linkText} </Link>
                <div>
                    <img src={arrow} alt='' />
                </div>
            </div>
        </>
    )
}
