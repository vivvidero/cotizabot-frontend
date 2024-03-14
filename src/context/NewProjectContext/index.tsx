import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";
import { Typology } from "../../types/Tipology";
import { Spaces } from "../../types/Spaces";

export interface NewProject {
    projectname: string,
    constructorname: string,
    city: string,
    neighborhood: string,
    address: string
    type: string,
    tipologies?: Typology[],
    spaces?: Spaces[]
    projectid?: number
    activeTypologyId?: number
    activeSpaceId?: number
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

    /* useEffect(() => {
        const storedQuotation = localStorage.getItem('newProject');

        if (storedQuotation) {

            setNewProject(JSON.parse(storedQuotation));
        }
    }, []) */


    return (
        <NewProjectContext.Provider value={{ newProject, setNewProject }}>
            {children}
        </NewProjectContext.Provider>
    )
}