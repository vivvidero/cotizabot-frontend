import news from '../../assets/icons/alerta.png'
import wishList from '../../assets/icons/wishlist.png'

export const UsedComments = () => {

    return (
        <div className='w-full grid grid-cols-2 gap-4 my-8'>
            <div className='flex flex-col gap-4'>
                <div className='flex'>
                    <img src={news} alt='novedades' />
                    <h3 className='mx-2 font-outfit font-medium text-3xl text-vivvi'>Novedades técnicas del proyecto</h3>
                </div>
                {/* <SubmitButton bg={'golden'}  >
                    Agregar comentario
                </SubmitButton> */}
                <div className='grid grid-cols-2 gap-2'>
                    <div className='rounded-lg flex flex-col p-2 gap-2' style={{ boxShadow: '0px 4px 6px 0px rgba(125, 125, 125, 0.25)' }}>
                        <div className='bg-honeydew px-2 rounded-full w-16 flex justify-center items-center'>
                            <p> Cocina</p>
                        </div>
                        <div className='bg-white p-4 rounded-lg flex justify-center items-center '>
                            <p className='text-sm font-roboto font-normal leading-4'>Lorem ipsum dolor sit amet. A laborum voluptas sit enim cumque et tenetur magni ut vitae itaque et consectetur obcaecati et laudantium nostrum sit soluta animi. dolor sit amet. A laborum voluptas sit enim cumque </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex'>
                    <img src={wishList} alt='novedades' />
                    <h3 className='mx-2 font-outfit font-medium text-3xl text-vivvi'>Lista de deseos de cliente</h3>
                </div>
                {/* <SubmitButton bg={'golden'} >
                    Agregar comentario
                </SubmitButton> */}
                <div className='grid grid-cols-2 gap-2'>
                    <div className='rounded-lg flex flex-col p-2 gap-2' style={{ boxShadow: '0px 4px 6px 0px rgba(125, 125, 125, 0.25)' }}>
                        <div className='bg-honeydew px-2 rounded-full w-16 flex justify-center items-center'>
                            <p> Cocina</p>
                        </div>
                        <div className='bg-white p-4 rounded-lg flex justify-center items-center '>
                            <p className='text-sm font-roboto font-normal leading-4'>Lorem ipsum dolor sit amet. A laborum voluptas sit enim cumque et tenetur magni ut vitae itaque et consectetur obcaecati et laudantium nostrum sit soluta animi. dolor sit amet. A laborum voluptas sit enim cumque </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
