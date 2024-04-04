import { Box, Modal } from '@mui/material'
import { Dispatch, SetStateAction } from 'react';
import SearchAppBar from './SearchBar';
import noData from '../../../../assets/images/noprojects.png'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 14,
    p: 4,
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    width: '65%'
};

export const AddReferenceModal = ({ open, handleClose }: { open: boolean, handleClose: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h4  className='font-outfit text-vivvi text-3xl'>
                    Agregar Referencia
                </h4>
                <SearchAppBar  placeholder={'Buscar referencia'}/>
                <div className='flex flex-col items-center gap-4 border border-platinum rounded-md p-8'>
                    <img src={noData} alt='Sin busqueda' className='w-32' />
                    <p className='text-xl'>No has realizado una búsqueda</p>
                </div>
            </Box>
        </Modal>
    )
}
