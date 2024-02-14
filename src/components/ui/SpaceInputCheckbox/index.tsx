import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { Spaces } from "../../../types/Spaces";

interface Props {
    options?: string[],
    name: string,
    singleSpace: string,
    spaces: Spaces[],
    setSpaces: Dispatch<SetStateAction<Spaces[]>>
}

export const SpaceInputCheckbox: FC<Props> = ({ options, name, singleSpace, spaces, setSpaces }) => {

    console.log(spaces);


    const handleSpaces = (e: ChangeEvent<HTMLInputElement>) => {

        if (!e.target.checked) {
            setSpaces(spaces.filter(space => space.name !== name))
            /* setNewProject((prevState) => {
                return {
                    ...prevState,
                    spaces: savedSpaces.filter(s => s.name !== space)
                }
            })
            localStorage.setItem('newProject', JSON.stringify({
                ...newProject,
                spaces: savedSpaces.filter(s => s.name !== space)
            })); */
        } else {

            setSpaces(spaces.concat({ name: name, roomNumber: 1 }))
            /* setNewProject((prevState) => {
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
            })); */
        }
    };


    const handleSpaceQuantity = (e: ChangeEvent<HTMLSelectElement>) => {

        const quantity = parseInt(e.target.value)
        const arrayRepetidos: { name: string, roomNumber: number }[] = []
        const updateNewProjectSpaces = spaces.filter(spa => spa.name !== name)
        for (let i = 1; i <= quantity; i++) {
            arrayRepetidos.push({ name: name, roomNumber: i });
        }
        setSpaces(updateNewProjectSpaces.concat(arrayRepetidos));

        /* localStorage.setItem('newProject', JSON.stringify({
            ...newProject,
            spaces: updateNewProjectSpaces.concat(arrayRepetidos)
        })); */
    };

    return (
        <label className="p-4 bg-white flex justify-between">
            <div>
                <input type="checkbox" name={name} onChange={handleSpaces} /* checked={newProject?.spaces?.some(space => space.name === 'socialBathRoomWithoutShower') || false} */ className="mr-2" /> {singleSpace}
            </div>
            {options && spaces?.some(space => space.name === name)
                &&
                <select onChange={handleSpaceQuantity} name={name} /* defaultValue={newProject.spaces.filter(space => space.name === "socialBathRoomWithoutShower").length} */>
                    {options.map(option => <option> {option} </option>)}
                </select>
            }
        </label>
    )
}
