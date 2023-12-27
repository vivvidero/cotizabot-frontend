import { FC, useContext } from 'react'
import { QuotationContext } from '../../context/QuotationContext'


interface Props {
    style: string,
    image: string,
    openModal: () => void
}

export const StyleCard: FC<Props> = ({ style, image, openModal }) => {

    const { setQuotation, quotation } = useContext(QuotationContext)

    const handlePickStyle = () => {

        setQuotation({
            ...quotation,
            styleCatalog: style
        })
        localStorage.setItem('quotation', JSON.stringify({ ...quotation, styleCatalog: style }))
        openModal()
    }



    return (
        <div className='rounded bg-white p-2.5 flex flex-col gap-3 drop-shadow'>
            <div className='h-64 rounded overflow-hidden'>
                <img src={image} alt='' className='w-full' />
            </div>
            <div className='flex justify-between font-roboto items-center'>
                <h3 className='ml-4 text-xl '>
                    {style}
                </h3>
                <button className='bg-dorado py-1.5 px-3 rounded-full w-44 border border-vivvi' onClick={handlePickStyle}>
                    Elegir  😍
                </button>
            </div>
        </div>
    )
}
