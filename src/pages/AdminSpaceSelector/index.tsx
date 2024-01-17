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

        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: {
                    ...prevState.spaces,
                    [space]: {
                        ...prevState.spaces[space],
                        isCheck: e.target.checked,
                        quantity: 1
                    }
                }
            };
        });

        localStorage.setItem('newProject', JSON.stringify({
            ...newProject,
            spaces: {
                ...newProject.spaces,
                [space]: {
                    ...newProject.spaces[space],
                    isCheck: e.target.checked,
                    quantity: 1
                }
            }
        }));
    };

    const handleSpaceQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
        const space = e.target.name;

        setNewProject((prevState) => {
            return {
                ...prevState,
                spaces: {
                    ...prevState.spaces,
                    [space]: {
                        ...prevState.spaces[space],
                        quantity: parseInt(e.target.value, 10)
                    }
                }
            };
        });

        localStorage.setItem('newProject', JSON.stringify({
            ...newProject,
            spaces: {
                ...newProject.spaces,
                [space]: {
                    ...newProject.spaces[space],
                    quantity: parseInt(e.target.value, 10)
                }
            }
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
                <p> {newProject.name} {" > "} {newProject.tipology.tipologyName} </p>

                <form className="flex flex-col gap-6 w-6/12 my-6">
                    <label className="p-4 bg-white">
                        <input type="checkbox" onChange={handleSpaces} name={"kitchen"} checked={newProject.spaces.kitchen.isCheck} className="mr-2" /> Cocina
                    </label>

                    <label className="p-4 bg-white">
                        <input type="checkbox" onChange={handleSpaces} name={"clothes"} checked={newProject.spaces.clothes.isCheck} className="mr-2" /> Ropas
                    </label>

                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"bathRoom"} checked={newProject.spaces.bathRoom.isCheck} className="mr-2" /> Baño
                        </div>
                        {newProject.spaces.bathRoom.isCheck && <select onChange={handleSpaceQuantity} name="bathRoom" defaultValue={newProject.spaces.bathRoom.quantity}>
                            <option>1</option>
                            <option>2</option>
                        </select>}

                    </label>
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"shower"} checked={newProject.spaces.shower.isCheck} className="mr-2" /> Ducha
                        </div>
                        {newProject.spaces.shower.isCheck && <select onChange={handleSpaceQuantity} name="shower" defaultValue={newProject.spaces.shower.quantity}>
                            <option>1</option>
                            <option>2</option>
                        </select>}

                    </label>
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"bedRoom"} checked={newProject.spaces.bedRoom.isCheck} className="mr-2" /> Habitación
                        </div>
                        {newProject.spaces.bedRoom.isCheck && <select onChange={handleSpaceQuantity} name="bedRoom" defaultValue={newProject.spaces.bedRoom.quantity}>
                            <option>1</option>
                            <option>2</option>
                        </select>}

                    </label>
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"study"} checked={newProject.spaces.study.isCheck} className="mr-2" /> Estudio
                        </div>
                        {newProject.spaces.study.isCheck && <select onChange={handleSpaceQuantity} name="study" defaultValue={newProject.spaces.study.quantity}>
                            <option>1</option>
                            <option>2</option>
                        </select>
                        }

                    </label>
                    <label className="p-4 bg-white flex justify-between">
                        <div>
                            <input type="checkbox" onChange={handleSpaces} name={"terrace"} checked={newProject.spaces.terrace.isCheck} className="mr-2" /> Terraza
                        </div>
                        {newProject.spaces.terrace.isCheck && <select onChange={handleSpaceQuantity} name="terrace" defaultValue={newProject.spaces.terrace.quantity}>
                            <option>1</option>
                            <option>2</option>
                        </select>}

                    </label>
                    <div className=" flex gap-5">
                        <button onClick={handleSubmit} className={`flex items-center justify-center gap-2 px-5 py-2 w-52 rounded-full text-lg hover:scale-95 duration-200 border bg-dorado text-vivvi border-vivvi`}>
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
