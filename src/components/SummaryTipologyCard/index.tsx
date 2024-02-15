import imageTipo from '../../assets/images/tipoImage.png'



export const SummaryTipologyCard = () => {
    return (

        <div className="w-full shadow-xl p-4 rounded-2xl flex flex-col gap-2 font-roboto">
            <div className="rounded overflow-hidden">
                <img src={imageTipo} alt="imagen tipologia" className="w-full" />
            </div>
            <h5 className="font-semibold text-xl"> Cocina en barra </h5>
            <div className="flex justify-between items-center p-2 bg-white rounded-xl font-medium">
                <p>Cielo raso</p>
                <div className="bg-honeydew p-1 px-2 rounded-2xl">
                    <p>65 m2</p>
                </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-xl font-medium">
                <p>Cielo raso (caja)</p>
                <div className="bg-honeydew p-1 px-2 rounded-2xl">
                    <p>65 m2</p>
                </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-xl font-medium">
                <p>Demoliciones</p>
                <div className="bg-honeydew p-1 px-2 rounded-2xl">
                    <p>65 m2</p>
                </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-xl font-medium">
                <p>Muros</p>
                <div className="bg-honeydew p-1 px-2 rounded-2xl">
                    <p>65 m2</p>
                </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-xl font-medium">
                <p>Mueble alto</p>
                <div className="bg-honeydew p-1 px-2 rounded-2xl">
                    <p>65 m2</p>
                </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-xl font-medium">
                <p>Mueble bajo</p>
                <div className="bg-honeydew p-1 px-2 rounded-2xl">
                    <p>65 m2</p>
                </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-xl font-medium">
                <p>Alacena</p>
                <div className="bg-honeydew p-1 px-2 rounded-2xl">
                    <p>65 m2</p>
                </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-xl font-medium">
                <p>Isla</p>
                <div className="bg-honeydew p-1 px-2 rounded-2xl">
                    <p>65 m2</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 justify-between items-center p-4 bg-white rounded-xl font-medium">
                <h5>Comentario técnico</h5>
                <p className="text-xs">Lorem ipsum dolor sit amet. A laborum voluptas sit enim cumque et tenetur magni ut vitae itaque et consectetur obcaecati et laudantium nostrum sit soluta animi!</p>
            </div>
        </div>

    )
}
