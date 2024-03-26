import npProjects from '../../../assets/images/noprojects.png'
import { LinkButton } from '..'

export const NoDataBox = ({ data, link }: { data: string, link: string }) => {
    return (
        <div className="w-1/2 m-auto border border-platinum rounded-lg bg-white flex flex-col items-center justify-center gap-6 p-6">
            <img className="w-1/4" src={npProjects} alt="sin proyectos" />
            <h3 className="text-2xl font-semibold"> {`No tienes ${data} creados aún`} </h3>
            <LinkButton link={link} bg="golden">
                {`Crear ${data}`}
            </LinkButton>
        </div>
    )
}
