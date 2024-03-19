import { Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import api from '../../../api'
import { Projects } from '../../../types/Projects'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { EditProjectButton } from '..'
import { LoadingContext } from '../../../context/LoadingContext'

interface Props {
    project: Projects,
    setProjects: Dispatch<SetStateAction<Projects[]>>
}

/**
 * Componente para mostrar un elemento de proyecto en la lista de proyectos del panel de administración.
 * Permite ver detalles del proyecto, editar y eliminar.
 */
export const AdminProyectItem: FC<Props> = ({ project, setProjects }) => {

    const [dropdownOpen, setDropdownOpen] = useState<null | HTMLElement>(null); // Estado para controlar la apertura del menú desplegable
    const open = Boolean(dropdownOpen); // Variable para determinar si el menú desplegable está abierto
    const { setLoading } = useContext(LoadingContext) // Contexto de carga para mostrar indicador de carga

    // Manejador para eliminar un proyecto
    const handleDelete = () => {
        const confDel = confirm(`Estás seguro de borrar el proyecto: ${project.projectname}`)
        if (confDel) {
            api.delete(`/projects/${project.projectid}`)
                .then((data) => {
                    console.log(data.data);
                    setLoading(true);
                    // Obtener proyectos después de eliminar
                    api.get('/proyectos')
                        .then((data) => {
                            setProjects(data.data);
                        })
                        .then(() => setLoading(false));
                })
                .catch(error => {
                    console.error("Error al eliminar el proyecto:", error);
                    setLoading(false);
                });
        }
    }

    // Manejadores para abrir y cerrar el menú desplegable
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setDropdownOpen(event.currentTarget);
    };
    const handleClose = () => {
        setDropdownOpen(null);
    };

    return (
        <div className='grid grid-cols-12 shadow-lg px-5 py-7 rounded-xl font-roboto text-lg bg-white items-center hover:bg-slate-50' >
            <div className='col-span-3'> {project.projectname} </div>
            <div className='col-span-2'><p>{project.constructorname} </p></div>
            <div className='col-span-2'><p> {project.city} </p></div>
            <div className='col-span-2'><p> {project.neighborhood} </p></div>
            <div className='col-span-2'><p> {project.address} </p></div>
            <div className='col-span-1 flex flex-col items-center justify-end relative'>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}>
                    <MoreVert />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={dropdownOpen}
                    open={open}
                    onClose={handleClose}

                >
                    <EditProjectButton project={project} />

                    <MenuItem onClick={handleDelete}>Eliminar </MenuItem>

                </Menu>

            </div>
        </div>
    )
}
