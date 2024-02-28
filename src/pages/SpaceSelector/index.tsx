import { useContext, useEffect, useState } from "react"
import { MainLayout, MiddleLayout } from "../../Layout"
import { AdminProgressBar, LinkButton, SpaceInputCheckbox, SubmitButton } from "../../components"
import { NewProjectContext } from "../../context"
import { useNavigate } from "react-router-dom"
import { Spaces } from "../../types/Spaces"
import api from "../../api"
import { LoadingContext } from "../../context/LoadingContext"

export const AdminSpaceSelector = () => {

    const { newProject } = useContext(NewProjectContext);
    const { setLoading } = useContext(LoadingContext);
    const [spaces, setSpaces] = useState<Spaces[]>([])
    const navigate = useNavigate();


    console.log(spaces);


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const localNewProjectSpaces = localStorage.getItem('newProjectSpaces')
            const newProjectSpaces = JSON.parse(localNewProjectSpaces)
            api.post(`/typologies/spaces/register`, { typologyId: newProject.activeTypologyId, spaceTypes: spaces })
                .then((data) => {
                    for (let i = 0; i < newProjectSpaces.length; i++) {
                        setSpaces((prevState) => {
                            return {
                                ...prevState,
                                spaceId: data.data.spaceIds[i]
                            }
                        })
                        newProjectSpaces[i].spaceId = data.data.spaceIds[i]
                    }
                    localStorage.setItem('newProjectSpaces', JSON.stringify(newProjectSpaces))
                    console.log(data.data);
                    navigate('space-info');
                })
        } catch (error) {
            console.log(error);
        }

        setLoading(false)
    };
 
    useEffect(() => {
        localStorage.removeItem('progressCounter')
        const localNewProjectSpaces = localStorage.getItem('newProjectSpaces')


        if (localNewProjectSpaces) {
            setSpaces(JSON.parse(localNewProjectSpaces))
        }

    }, [])





    return (
        <MainLayout>
            <AdminProgressBar progress={2} />
            <MiddleLayout>
                <h2 className="font-outfit text-2xl text-vivvi">Selecciona los espacios del proyecto</h2>
                <p> {newProject.projectName} {" > "} {/* {newProject.tipology.tipologyName} */} </p>
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
                        <SubmitButton handle={handleSubmit} bg="golden" >
                            Continuar
                        </SubmitButton>
                        <LinkButton link="/" bg="">
                            Cancelar
                        </LinkButton>
                    </div>
                </form>
            </MiddleLayout>
        </MainLayout>
    )
}