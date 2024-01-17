import React, { ReactNode } from 'react';
import ReactModal from 'react-modal'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
}

export const NewProjectModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    maxWidth: '672px',
                    margin: 'auto',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '30px',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: '334px'
                },
            }}
        >
            {children}
        </ReactModal>
    );
};

