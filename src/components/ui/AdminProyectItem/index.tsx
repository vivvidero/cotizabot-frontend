import { Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import api from '../../../api/projects'
import { Projects } from '../../../types/Projects/Projects'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { EditProjectButton, NewTipologyModal } from '..'
import { LoadingContext } from '../../../context/LoadingContext'


interface Props {
    project: Projects,
    setProjects: Dispatch<SetStateAction<Projects[]>>
}

export const AdminProyectItem: FC<Props> = ({ project, setProjects }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<null | HTMLElement>(null);
    const { setLoading } = useContext(LoadingContext)

    const handleDelete = () => {
        setIsModalOpen(true);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setDropdownOpen(event.currentTarget);
    };

    const handleClose = () => {
        setDropdownOpen(null);
    };

    const handleConfirmDelete = () => {
        api.delete(`/projects/${project.projectid}`)
            .then((data) => {
                console.log(data.data);
                setLoading(true);
                api.get('/proyectos')
                    .then((data) => {
                        setProjects(data.data);
                        //console.log("Proyecto eliminado:", project.projectid);
                    })
                    .then(() => setLoading(false))
                    .then(() => setIsModalOpen(false));
            })
            .catch(error => {
                console.error("Error al eliminar el proyecto:", error);
                setLoading(false);
            });
    }
    return (
        <>
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
                        aria-controls={dropdownOpen ? 'long-menu' : undefined}
                        aria-expanded={dropdownOpen ? 'true' : undefined}
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
                        open={Boolean(dropdownOpen)}
                        onClose={handleClose}
                    >
                        <EditProjectButton project={project} />
                        <MenuItem onClick={() => { handleDelete(); handleClose(); }}>Eliminar </MenuItem>
                    </Menu>
                </div>
            </div>
            {/*Modal para confirmar eliminar un proyecto*/}
            <NewTipologyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className='text-3xl font-roboto mb-4'>¿Estás seguro de eliminar el proyecto: {project.projectname}?</h2>
                <div className="flex flex-col justify-center gap-4 mt-6 md:flex-row md:justify-center md:gap-4 overflow-y-hidden">
                    <button className="bg-dorado hover:bg-dorado justify-center py-2 md:w-40 lg:w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border border-black flex items-center" onClick={handleConfirmDelete}>Sí</button>
                    <button className="bg-transparent hover:bg-gray-100 justify-center py-2 md:w-40 lg:w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border border-black flex items-center" onClick={() => setIsModalOpen(false)}>No</button>
                </div>
            </NewTipologyModal>
        </>
    )
}