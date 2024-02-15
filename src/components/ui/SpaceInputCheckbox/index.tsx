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

    const handleSpaces = (e: ChangeEvent<HTMLInputElement>) => {

        if (!e.target.checked) {
            setSpaces(spaces.filter(space => space.name !== name))

            localStorage.setItem('newProjectSpaces', JSON.stringify(spaces.filter(space => space.name !== name)))
        } else {

            setSpaces(spaces.concat({ name: name, roomNumber: 1 }))
            localStorage.setItem('newProjectSpaces', JSON.stringify(spaces.concat({ name: name, roomNumber: 1 })))
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

        localStorage.setItem('newProjectSpaces', JSON.stringify(updateNewProjectSpaces.concat(arrayRepetidos)));
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
