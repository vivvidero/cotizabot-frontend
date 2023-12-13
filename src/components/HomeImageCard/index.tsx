import arrow from '../../assets/icons/Arrow---Up.png'
import { FC } from 'react'
import { LinkButton } from '../ui'


interface Props {
    cardImage: string,
    linkText: string
}

export const HomeImageCard: FC<Props> = ({ cardImage, linkText }) => {
    return (
        <div className='hover:scale-105 duration-300 ease-in-out cursor-pointer'>
            <div>
                <img src={cardImage} alt={'image'} className='object-contain  w-full' />
            </div>
            <div className='bg-anti-flash grid place-content-center p-6 drop-shadow-lg'>
                <LinkButton link={'https://mymind.com/'} bg='green' >
                    <p>{linkText} </p>
                    <img src={arrow} alt='arrow' />
                </LinkButton>

            </div>
        </div>
    )
}
