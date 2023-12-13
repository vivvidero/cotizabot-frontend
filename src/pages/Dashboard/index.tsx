import { MainLayout } from "../../Layout"
import placeholder from '../../assets/images/placeholder.png'
import pdfIcon from '../../assets/icons/pdf.png'
import cocina from '../../assets/images/cocina.png'
import baño from '../../assets/images/baño.png'
import living from '../../assets/images/living.png'
import habitacion from '../../assets/images/habitacion.png'
import chango from '../../assets/images/chango.png'
import meet from '../../assets/icons/logos_google-meet.png'

import { CardEspacioDashboard, DashboardNuevoEspacio, LinkButton } from "../../components"


export const DashboardPage = () => {
    return (
        <MainLayout>
            <div className="flex flex-col gap-11 px-10 py-14">
                <div className="flex gap-3 items-center">
                    {/* <img src={avatar} alt="avatar" /> */}
                    <h2 className="font-outfit text-vivvi text-5xl">Bienvenida al vivvi dashboard</h2>
                </div>
                <section className="grid grid-cols-2 gap-6 bg-white p-6 rounded-2xl">
                    <article className="w-10/12">
                        <img src={placeholder} alt="casa" />
                    </article>
                    <article className="flex flex-col gap-3 font-roboto w-full">
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

                    </article>
                </section>
                <div className="grid grid-cols-2 items-center bg-gradient-to-b from-vivvi to-caribbean py-4 px-36 rounded-2xl">
                    <div className="flex flex-col items-center justify-center gap-8">
                        <h3 className="font-outfit text-white text-4xl font-bold text-center">
                            Selecciona paso a paso los
                            materiales de tu remodelación
                        </h3>
                        <LinkButton link="/" bg="golden">
                            Empezar cotización
                        </LinkButton>

                    </div>
                    <div className="flex justify-center">
                        <img src={chango} alt="" />
                    </div>
                </div>
                <section className="flex flex-col gap-x-5 gap-y-10">
                    <h2 className="text-4xl font-outfit text-vivvi text-center">Así va tu cotización        </h2>
                    <CardEspacioDashboard espacioUrl={cocina} espacio="Cocina" />
                    <CardEspacioDashboard espacioUrl={baño} espacio="Baño" />
                    <CardEspacioDashboard espacioUrl={habitacion} espacio="Habitación" />
                    <CardEspacioDashboard espacioUrl={living} espacio="Living" />
                    <DashboardNuevoEspacio />
                </section>
                <div className="flex gap-4 items-center justify-center bg-white py-8 px-36 rounded-2xl relative overflow-hidden">
                    <LinkButton link={'/dashboard/1'} bg={'golden'}>
                        <p>Guardar cambios</p>
                        <div className="grid place-content-center">
                            <img src={pdfIcon} alt="pdf" />
                        </div>
                    </LinkButton>
                    <LinkButton link={'/dashboard/1'} bg={'golden'}>
                        <p>Descargar    </p>
                        <div className="grid place-content-center">
                            <img src={pdfIcon} alt="pdf" />
                        </div>
                    </LinkButton>
                    <LinkButton link={'/dashboard/1'} bg={'golden'}>
                        <p>Agendar llamada</p>
                        <div className="grid place-content-center">
                            <img src={meet} alt="pdf" />
                        </div>
                    </LinkButton>
                </div>
            </div>
        </MainLayout>
    )
}
