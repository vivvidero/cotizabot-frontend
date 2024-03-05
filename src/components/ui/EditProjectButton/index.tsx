import { Button, MenuItem } from '@mui/material'
import { FC, forwardRef, useContext, useState } from 'react';
import { Modal as BaseModal } from '@mui/base/Modal';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Projects } from '../../../types/Projects';
import { useNavigate } from 'react-router-dom';
import { NewProjectContext } from '../../../context';

interface Props {
    project: Projects
}

export const EditProjectButton: FC<Props> = ({ project }) => {

    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate()
    const { setNewProject } = useContext(NewProjectContext)

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.value === 'Información de proyecto') {
            localStorage.setItem('newProject', JSON.stringify(project))
            setNewProject((prevState) => {
                return {
                    ...prevState,
                    projectid: project.projectid
                }
            })
            navigate('edit-project')
        } else {
            setNewProject(() => {
                return {
                    ...project,
                    projectid: project.projectid
                }
            })
            navigate('/new-project/tipology')
        }

    }

    return (
        <>
            <MenuItem onClick={() => setOpen(true)}> Editar</MenuItem>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={() => setOpen(false)}
                slots={{ backdrop: StyledBackdrop }}
            >
                <ModalContent>
                    <h2 id="unstyled-modal-title" className="modal-title text-center font-outfit text-2xl">
                        Que quieres editar?
                    </h2>

                    <Button color="success" variant="contained" onClick={handleEdit} value={'Información de proyecto'}>Información de proyecto</Button>
                    <Button color="success" variant="contained" onClick={handleEdit} value={'Tipologias'}>Tipologias</Button>

                </ModalContent>
            </Modal>
        </>
    )
}

const Backdrop = forwardRef<
    HTMLDivElement,
    { open?: boolean; className: string }
>((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'base-Backdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});


const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
);