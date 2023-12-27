import { FC, useContext } from 'react'
import edit from '../../assets/icons/Edit.png'
import { CartCanvasContext } from '../../context';

interface Props {
  fixture: string,
  price: number
}

export const RowCardDashboardEspacio: FC<Props> = ({ fixture, price }) => {

  const { toggleOffCanvas } = useContext(CartCanvasContext)

  return (
    <div className='flex flex-col'>
      <div className="grid grid-cols-6 font-roboto text-xl place-content-center py-4">
        <div className='col-span-3'>
          <p> {fixture} </p>
        </div>
        <div className='col-span-2'>
          <p>{price} $</p>
        </div>
        <button className='flex justify-end cursor-pointer' onClick={toggleOffCanvas}>
          <img src={edit} alt="editar" />
        </button>
      </div>
      <hr />


    </div>

  )
}
