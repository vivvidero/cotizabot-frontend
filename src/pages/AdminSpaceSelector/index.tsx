import {  FormEvent, useContext, useState } from "react"
import { MainLayout, MiddleLayout } from "../../Layout"
import { AdminProgressBar, LinkButton, SpaceInputCheckbox } from "../../components"
import { NewProjectContext } from "../../context"
import { useNavigate } from "react-router-dom"
import { Spaces } from "../../types/Spaces"

export const AdminSpaceSelector = () => {

    const { newProject } = useContext(NewProjectContext);
    const [spaces, setSpaces] = useState<Spaces[]>([])
    const navigate = useNavigate();
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        localStorage.setItem('newProject', JSON.stringify({ ...newProject, spaces: newProject.spaces }));
        navigate('space-info');
    };
    return (
        <MainLayout>
            <AdminProgressBar progress={2} />
            <MiddleLayout>
                <h2 className="font-outfit text-2xl text-vivvi">Selecciona los espacios del proyecto</h2>
                <p> {newProject.projectname} {" > "} {/* {newProject.tipology.tipologyName} */} </p>
                <form className="flex flex-col gap-6 w-6/12 my-6 font-medium">
                    <SpaceInputCheckbox name={'kitchen'} singleSpace="Cocina" spaces={spaces} setSpaces={setSpaces} />                   
                    <SpaceInputCheckbox name={"clothes"} setSpaces={setSpaces} singleSpace="Ropas" spaces={spaces} />                   
                    <SpaceInputCheckbox name={'socialBathRoomWithoutShower'} setSpaces={setSpaces} spaces={spaces} singleSpace={'Baño Social (Sin ducha)'} options={["1", "2"]} />                   
                    <SpaceInputCheckbox name={'bathRoomWithShower'} setSpaces={setSpaces} spaces={spaces} singleSpace={'Baño (con ducha)'} options={['1', '2']} />                  
                    <SpaceInputCheckbox name={'bedRoom'} setSpaces={setSpaces} spaces={spaces} singleSpace={'Habitación'} options={['1', '2']} />                   
                    <SpaceInputCheckbox name={'study'} setSpaces={setSpaces} spaces={spaces} singleSpace={'Estudio'} options={['1', '2']} />                  
                    <SpaceInputCheckbox name={'diningRoom'} setSpaces={setSpaces} spaces={spaces} singleSpace={'Sala Comedor'} options={['1', '2']} />                    
                    <SpaceInputCheckbox name={'hall'} setSpaces={setSpaces} spaces={spaces} singleSpace={'Hall'} options={['1', '2']} />              
                    <SpaceInputCheckbox name={'terraceYard'} setSpaces={setSpaces} spaces={spaces} singleSpace={'Terraza/Patio'} options={['1', '2']} />
                    <SpaceInputCheckbox name={'balcony'} setSpaces={setSpaces} spaces={spaces} singleSpace={'Balcón'} options={['1', '2']} />        
                    <div className=" flex gap-5">
                        <button onClick={handleSubmit} className={`flex items-center justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi`}>
                            Continuar
                        </button    >
                        <LinkButton link="/" bg="">
                            Cancelar
                        </LinkButton>
                    </div>
                </form>
            </MiddleLayout>
        </MainLayout>
    )
}