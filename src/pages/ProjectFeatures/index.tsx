import { Link } from "react-router-dom"
import { MainLayout } from "../../Layout"
import './ProjectFeatures.css'

export const ProjectFeatures = () => {
  return (
    <MainLayout>
      <form className="px-96 py-16 flex flex-col gap-11">
        <article>
          <h2 className="font-outfit font-semibold text-3xl text-vivvi mb-11">Conoces el nombre de tu proyecto?</h2>
          
            <div className="flex items-center gap-2 p-6 border border-platinum rounded bg-white ">
              <select className="select-css">
                <option defaultValue={''}>  </option>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
              <label className="font-roboto text-xl">Selecciona tu proyecto</label>
            </div>  
        </article>
        <article>
          <h2 className="font-outfit font-semibold text-3xl text-vivvi mb-11">Qué tipo de proyecto tienes?</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 p-6 border border-platinum rounded bg-white ">
              <input type="checkbox" className="w-5 h-5 rounded-full bg-white align-middle border border-black appearance-none outline-none cursor-pointer checked:bg-slate-600 " />
              <label className="font-roboto text-xl">1</label>
            </div>
            <div className="flex items-center gap-2 p-6 border border-platinum rounded bg-white ">
              <input type="checkbox" className="w-5 h-5 rounded-full bg-white align-middle border border-black appearance-none outline-none cursor-pointer checked:bg-slate-600 " />
              <label className="font-roboto text-xl">2</label>
            </div>
            <div className="flex items-center gap-2 p-6 border border-platinum rounded bg-white ">
              <input type="checkbox" className="w-5 h-5 rounded-full bg-white align-middle border border-black appearance-none outline-none cursor-pointer checked:bg-slate-600 " />
              <label className="font-roboto text-xl">2A</label>
            </div>
          </div>
        </article>
        <Link to={'/style-selector'} className="px-5 py-3 bg-dorado text-vivvi font-roboto text-xl rounded-full border border-vivvi w-5/12 text-center">Empezar</Link>
      </form>
    </MainLayout>
  )
}
