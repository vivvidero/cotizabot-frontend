import { FC } from "react"
import { BotonVerde } from ".."
import carrito from '../../assets/icons/Buy.png'
import arrow from '../../assets/icons/Arrow---Up.png'

interface Props {
  espacio: string,
  espacioUrl: string
}

export const DashboardEspacio: FC<Props> = ({ espacio, espacioUrl }) => {
  return (
    <article className="rounded shadow-xl">
      <div>
        <img src={espacioUrl} alt="cocina" className="w-full" />
      </div>
      <div className="grid grid-cols-2 p-5">
        <div className="text-2xl    ">
          <p className="font-outfit "> {espacio} </p>
          <p className="font-roboto">$3.500.000</p>
        </div>
        <div className="flex items-center justify-end gap-5">
          <img src={carrito} alt="Cart" />
          <BotonVerde link="/dashboard">
            <p>Editar</p>
            <img src={arrow} alt="arrow" />
          </BotonVerde>
        </div>
      </div>
    </article>
  )
}
