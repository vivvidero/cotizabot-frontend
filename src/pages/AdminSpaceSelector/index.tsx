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
                            number: 1
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
                        number: 1
                    }
                ]
            }));
        }
    };

    const handleSpaceQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
        const space = e.target.name;

        const quantity = parseInt(e.target.value)
        const arrayRepetidos: { name: string, number: number }[] = []
        const updateNewProjectSpaces = newProject.spaces.filter(spa => spa.name !== space)


        for (let i = 1; i <= quantity; i++) {
            arrayRepetidos.push({ name: space, number: i });
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
                <p> {newProject.projectname} {" > "} {newProject.tipology.tipologyName} </p>

                <form className="flex flex-col gap-6 w-6/12 my-6">
                    <label className="p-4 bg-white">
                        <input type="checkbox" onChange={handleSpaces} name={"kitchen"} checked={newProject?.spaces?.some(space => space.name === 'kitchen') || false} className="mr-2" /> Cocina
                    </label>

                    <label className="p-4 bg-white">
                        <input type="checkbox" onChange={handleSpaces} name={"clothes"} checked={newProject?.spaces?.some(space => space.name === 'clothes') || false} className="mr-2" /> Ropas
                    </label>

                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"bathRoom"} checked={newProject?.spaces?.some(space => space.name === 'bathRoom') || false} className="mr-2" /> Baño
                        </div>
                        {newProject?.spaces?.some(space => space.name === "bathRoom") && <select onChange={handleSpaceQuantity} name="bathRoom" defaultValue={newProject.spaces.filter(space => space.name === "bathRoom").length}>
                            <option>1</option>
                            <option>2</option>
                        </select>}

                    </label>
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"shower"} checked={newProject?.spaces?.some(space => space.name === 'shower') || false} className="mr-2" /> Ducha
                        </div>
                        {newProject?.spaces?.some(space => space.name === "shower") && <select onChange={handleSpaceQuantity} name="shower" defaultValue={newProject.spaces.filter(space => space.name === "shower").length}>
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
                            <input type="checkbox" onChange={handleSpaces} name={"terrace"} checked={newProject?.spaces?.some(space => space.name === 'terrace') || false} className="mr-2" /> Terraza
                        </div>
                        {newProject?.spaces?.some(space => space.name === "terrace") && <select onChange={handleSpaceQuantity} name="terrace" defaultValue={newProject.spaces.filter(space => space.name === "terrace").length}>
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
