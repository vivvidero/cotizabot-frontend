import { ChangeEvent, FormEvent, useContext } from "react"
import { MainLayout, MiddleLayout } from "../../Layout"
import { AdminProgressBar, LinkButton } from "../../components"
import { NewProjectContext } from "../../context"
import { useNavigate } from "react-router-dom"

export const AdminSpaceSelector = () => {

    const { newProject, setNewProject } = useContext(NewProjectContext);
    const navigate = useNavigate();

    const handleSpaces = (e: ChangeEvent<HTMLInputElement>) => {
        const space = e.target.name;

        const savedSpaces = newProject.spaces

        if (!e.target.checked) {
            setNewProject((prevState) => {
                return {
                    ...prevState,
                    spaces: savedSpaces.filter(s => s.name !== space)
                }
            })
            localStorage.setItem('newProject', JSON.stringify({
                ...newProject,
                spaces: savedSpaces.filter(s => s.name !== space)
            }));
        } else {
            setNewProject((prevState) => {
                return {
                    ...prevState,
                    spaces: [
                        ...prevState.spaces,
                        {
                            name: space,
                            roomNumber: 1,
                            tipologies: [{id: 1}]
                        }
                    ]
                }
            })
            localStorage.setItem('newProject', JSON.stringify({
                ...newProject,
                spaces: [
                    ...newProject.spaces,
                    {
                        name: space,
                        roomNumber: 1,
                        tipologies: [{id: 1}]
                    }
                ]
            }));
        }
    };

    const handleSpaceQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
        const space = e.target.name;

        const quantity = parseInt(e.target.value)
        const arrayRepetidos: { name: string, roomNumber: number, tipologies: {id: number}[] }[] = []
        const updateNewProjectSpaces = newProject.spaces.filter(spa => spa.name !== space)


        for (let i = 1; i <= quantity; i++) {
            arrayRepetidos.push({ name: space, roomNumber: i, tipologies: [{id: 1}] });
        }

        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: updateNewProjectSpaces.concat(arrayRepetidos)

            };
        });

        localStorage.setItem('newProject', JSON.stringify({
            ...newProject,
            spaces: updateNewProjectSpaces.concat(arrayRepetidos)
        }));
    };

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
                <p> {newProject.projectName} {" > "} {/* {newProject.tipology.tipologyName} */} </p>

                <form className="flex flex-col gap-6 w-6/12 my-6 font-medium">
                    <label className="p-4 bg-white">
                        <input type="checkbox" onChange={handleSpaces} name={"kitchen"} checked={newProject?.spaces?.some(space => space.name === 'kitchen') || false} className="mr-2" /> Cocina
                    </label>

                    <label className="p-4 bg-white">
                        <input type="checkbox" onChange={handleSpaces} name={"clothes"} checked={newProject?.spaces?.some(space => space.name === 'clothes') || false} className="mr-2" /> Ropas
                    </label>
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"socialBathRoomWithoutShower"} checked={newProject?.spaces?.some(space => space.name === 'socialBathRoomWithoutShower') || false} className="mr-2" /> Baño Social (Sin ducha)
                        </div>
                        {newProject?.spaces?.some(space => space.name === "socialBathRoomWithoutShower") && <select onChange={handleSpaceQuantity} name="socialBathRoomWithoutShower" defaultValue={newProject.spaces.filter(space => space.name === "socialBathRoomWithoutShower").length}>
                            <option>1</option>
                            <option>2</option>
                        </select>}

                    </label>
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"bathRoomWithShower"} checked={newProject?.spaces?.some(space => space.name === 'bathRoomWithShower') || false} className="mr-2" /> Baño (con ducha)
                        </div>
                        {newProject?.spaces?.some(space => space.name === "bathRoomWithShower") && <select onChange={handleSpaceQuantity} name="bathRoomWithShower" defaultValue={newProject.spaces.filter(space => space.name === "bathRoomWithShower").length}>
                            <option>1</option>
                            <option>2</option>
                        </select>}

                    </label>
                    
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"bedRoom"} checked={newProject?.spaces?.some(space => space.name === 'bedRoom') || false} className="mr-2" /> Habitación
                        </div>
                        {newProject?.spaces?.some(space => space.name === "bedRoom") && <select onChange={handleSpaceQuantity} name="bedRoom" defaultValue={newProject.spaces.filter(space => space.name === "bedRoom").length}>
                            <option>1</option>
                            <option>2</option>
                        </select>}

                    </label>
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"study"} checked={newProject?.spaces?.some(space => space.name === 'study') || false} className="mr-2" /> Estudio
                        </div>
                        {newProject?.spaces?.some(space => space.name === "study") && <select onChange={handleSpaceQuantity} name="study" defaultValue={newProject.spaces.filter(space => space.name === "study").length}>
                            <option>1</option>
                            <option>2</option>
                        </select>
                        }

                    </label>
                   
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"diningRoom"} checked={newProject?.spaces?.some(space => space.name === 'diningRoom') || false} className="mr-2" /> Sala Comedor
                        </div>
                        {newProject?.spaces?.some(space => space.name === "diningRoom") && <select onChange={handleSpaceQuantity} name="diningRoom" defaultValue={newProject.spaces.filter(space => space.name === "diningRoom").length}>
                            <option>1</option>
                            <option>2</option>
                        </select>
                        }

                    </label>
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"hall"} checked={newProject?.spaces?.some(space => space.name === 'hall') || false} className="mr-2" /> Hall
                        </div>
                        {newProject?.spaces?.some(space => space.name === "hall") && <select onChange={handleSpaceQuantity} name="hall" defaultValue={newProject.spaces.filter(space => space.name === "hall").length}>
                            <option>1</option>
                            <option>2</option>
                        </select>
                        }

                    </label>
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"terraceYard"} checked={newProject?.spaces?.some(space => space.name === 'terraceYard') || false} className="mr-2" /> Terraza/Patio
                        </div>
                        {newProject?.spaces?.some(space => space.name === "terraceYard") && <select onChange={handleSpaceQuantity} name="terraceYard" defaultValue={newProject.spaces.filter(space => space.name === "terraceYard").length}>
                            <option>1</option>
                            <option>2</option>
                        </select>}

                    </label>
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"balcony"} checked={newProject?.spaces?.some(space => space.name === 'balcony') || false} className="mr-2" /> Balcón
                        </div>
                        {newProject?.spaces?.some(space => space.name === "balcony") && <select onChange={handleSpaceQuantity} name="balcony" defaultValue={newProject.spaces.filter(space => space.name === "balcony").length}>
                            <option>1</option>
                            <option>2</option>
                        </select>}

                    </label>
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
