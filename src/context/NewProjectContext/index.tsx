import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Tipology } from "../../types/Tipology";

export interface NewProject {
    name: string,
    constructionName: string, 
    tipology: Tipology
}

interface NewProjectContextProps {
    newProject: NewProject,
    setNewProject: Dispatch<SetStateAction<NewProject>>,
}

interface Props {
    children: ReactNode
}

export const NewProjectContext = createContext<NewProjectContextProps>({} as NewProjectContextProps)

export const NewProjectProvider: FC<Props> = ({ children }) => {

    const [newProject, setNewProject] = useState<NewProject>({
        name: '',
        constructionName: '',
        tipology : {
            tipologyName: '',
            tipologyType: '',
            tipologyPrivateArea: '',
            tipologyConstructedArea: '',
            tipologyImage: File | null
        }
    })

    useEffect(() => {
        const storedQuotation = localStorage.getItem('newProject');
        
        if (storedQuotation) {
            console.log(newProject);
                        
            setNewProject(JSON.parse(storedQuotation));
        }
    }, [])


    return (
        <NewProjectContext.Provider value={{ newProject, setNewProject }}>
            {children}
        </NewProjectContext.Provider>
    )
}