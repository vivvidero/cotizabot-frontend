import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Tipology } from "../../types/Tipology";
import { Spaces } from "../../types/Spaces";

export interface NewProject {
    projectname: string,
    constructorname: string,
    tipology: Tipology,
    spaces: Spaces[]
}

interface NewProjectContextProps {
    newProject: NewProject,
    setNewProject: Dispatch<SetStateAction<NewProject>>,
}

interface Props {
    children: ReactNode
}

const initialValue: NewProject = {
    projectname: '',
    constructorname: '',
    tipology: {
        tipologyName: '',
        tipologyType: '',
        tipologyPrivateArea: '',
        tipologyConstructedArea: '',
        tipologyImage: null
    },
    spaces: []

}



export const NewProjectContext = createContext<NewProjectContextProps>({} as NewProjectContextProps)

export const NewProjectProvider: FC<Props> = ({ children }) => {

    const [newProject, setNewProject] = useState<NewProject>(initialValue)

    useEffect(() => {
        const storedQuotation = localStorage.getItem('newProject');

        if (storedQuotation) {
            console.log(newProject);

            setNewProject(JSON.parse(storedQuotation));
        }
    }, [])


    console.log(newProject);

    return (
        <NewProjectContext.Provider value={{ newProject, setNewProject }}>
            {children}
        </NewProjectContext.Provider>
    )
}