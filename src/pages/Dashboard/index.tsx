import { MainLayout } from "../../Layout"
import placeholder from '../../assets/images/placeholder.png'
import pdfIcon from '../../assets/icons/pdf.png'
import cocina from '../../assets/images/cocina.png'
import baño from '../../assets/images/baño.png'
import living from '../../assets/images/living.png'
import habitacion from '../../assets/images/habitacion.png'

import {  DashboardEspacio, DashboardNuevoEspacio } from "../../components"


export const DashboardPage = () => {
    return (
        <MainLayout>
            <div className="flex flex-col gap-11">
                <section className="grid grid-cols-2 gap-6">
                    <article>
                        <img src={placeholder} alt="" />
                    </article>
                    <article className="flex flex-col gap-3 font-roboto">
                        <div className="p-6 border border-platinum rounded ">
                            <h4 className="text-lg">Nombre del proyecto</h4>
                            <h3 className="text-4xl font-semibold">Mi casita 01</h3>
                        </div>
                        <div>
                            <div className="p-4  border border-platinum rounded grid grid-cols-3">
                                <p>Estilo</p>
                                <p>Proyecto</p>
                                <p>Área</p>
                            </div>
                            <div className="p-4 grid grid-cols-3 text-2xl font-normal">
                                <p>Minimal Black</p>
                                <p>Veramonte</p>
                                <p>64 mts</p>
                            </div>
                        </div>
                        <div>
                            <div className="p-4  border border-platinum rounded grid grid-cols-3">
                                <p>Tipología</p>
                                <p>Precio estimado</p>
                                <p>Esta cotización caduca en:</p>
                            </div>
                            <div className="p-4 grid grid-cols-3 text-2xl font-normal">
                                <p>2A</p>
                                <p>$5.500.000</p>
                                <p>12/12/23</p>
                            </div>
                        </div>
                        <button className="flex items-center justify-center gap-2 rounded-full px-6 py-2 bg-sunset text-vivvi w-fit ">
                            <p className="text-xl">Descargar</p>
                            <img src={pdfIcon} alt="pdf" />
                        </button>
                    </article>
                </section>
                <section className="grid grid-cols-3 gap-x-5 gap-y-10">
                    <DashboardEspacio espacioUrl={cocina} espacio="Cocina"/>
                    <DashboardEspacio espacioUrl={baño} espacio="Baño"/>
                    <DashboardEspacio espacioUrl={habitacion} espacio="Habitación" />
                    <DashboardEspacio espacioUrl={living} espacio="Living"/>   
                    <DashboardNuevoEspacio />
                </section>
            </div>

        </MainLayout>
    )
}
