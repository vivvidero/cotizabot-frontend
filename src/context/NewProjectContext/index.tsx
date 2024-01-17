import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Tipology } from "../../types/Tipology";
import { Spaces } from "../../types/Spaces";

export interface NewProject {
    name: string,
    constructionName: string,
    tipology: Tipology,
    spaces: Spaces
}

interface NewProjectContextProps {
    newProject: NewProject,
    setNewProject: Dispatch<SetStateAction<NewProject>>,
}

interface Props {
    children: ReactNode
}

const initialValue: NewProject = {
    name: '',
    constructionName: '',
    tipology: {
        tipologyName: '',
        tipologyType: '',
        tipologyPrivateArea: '',
        tipologyConstructedArea: '',
        tipologyImage: File | null
    },
    spaces: {
        kitchen: {
            isCheck: false,
            quantity: 0,
            features: {

            }
        },
        clothes: {
            isCheck: false,
            quantity: 0,
            features: {

            }
        },
        bathRoom: {
            isCheck: false,
            quantity: 0,
            features: {

            }
        },
        shower: {
            isCheck: false,
            quantity: 0,
            features: {

            }
        },
        bedRoom: {
            isCheck: false,
            quantity: 0,
            features: {

            }
        },
        study: {
            isCheck: false,
            quantity: 0,
            features: {

            }
        },
        terrace: {
            isCheck: false,
            quantity: 0,
            features: {

            }
        }
    }

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