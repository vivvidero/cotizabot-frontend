import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Tipology } from "../../types/Tipology";
import { Spaces } from "../../types/Spaces";

export interface NewProject {
    projectname: string,
    constructorname: string,
    city: string,
    neighborhood: string,
    address: string
    type: string,
    tipologies?: Tipology[],
    spaces?: Spaces[]
    projectId?: number
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
    city: '',
    neighborhood: '',
    type: '',
    address: '',
}



export const NewProjectContext = createContext<NewProjectContextProps>({} as NewProjectContextProps)

export const NewProjectProvider: FC<Props> = ({ children }) => {

    const [newProject, setNewProject] = useState<NewProject>(initialValue)

    useEffect(() => {
        const storedQuotation = localStorage.getItem('newProject');

        if (storedQuotation) {

            setNewProject(JSON.parse(storedQuotation));
        }
    }, [])

    
    return (
        <NewProjectContext.Provider value={{ newProject, setNewProject }}>
            {children}
        </NewProjectContext.Provider>
    )
}