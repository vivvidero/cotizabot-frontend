import { FC } from "react"
import { RowCardDashboardEspacio } from "./RowCardDashboardEspacio"
import { LinkButton } from "../../components"

interface Props {
  espacio: string,
  espacioUrl: string
}

export const CardEspacioDashboard: FC<Props> = ({ espacio, espacioUrl }) => {
  return (
    <article className="rounded-md flex p-4 bg-white gap-10">
      <div className="w-1/3 h-96 rounded-lg overflow-hidden" >
        <img src={espacioUrl} alt="cocina" className="w-full h-full object-cover" />
      </div>
      <div className="w-2/3 grid grid-cols-2 p-5 gap-28">
        <div>
          <div className="grid grid-cols-6 font-roboto mb-4 h-20">
            <div className="col-span-3">
              <h4 className="text-slate-500 text-xl" >Nombre</h4>
              <p className="font-outfit text-3xl"> {espacio} </p>
            </div>
            <div className="col-span-2">
              <h4 className="text-slate-500 text-xl">Precio</h4>
              <p className="font-outfit text-3xl">$0</p>
            </div>
          </div>
          <div className="grid grid-rows-3">
            <RowCardDashboardEspacio fixture="Muros" price={0} />
            <RowCardDashboardEspacio fixture="Muebles fijos" price={0} />
            <RowCardDashboardEspacio fixture="Iluminación" price={0} />
          </div>
        </div>

        <div>
          <div className="grid grid-cols-6 font-roboto mb-4 h-20">
            <div className="col-span-3">

            </div>
            <div className="col-span-3 flex justify-end items-center">
              <LinkButton link="/dashboard/1  " bg={'golden'} >
                <p>Editar todo</p>
              </LinkButton>
            </div>
          </div>
          <div className="grid grid-rows-3">
            <RowCardDashboardEspacio fixture="Techos" price={0} />
            <RowCardDashboardEspacio fixture="Aparatos" price={0} />
            <RowCardDashboardEspacio fixture="Mobiliario" price={0} />
          </div>
        </div>

      </div>
    </article>
  )
}
