import React, { ReactNode } from 'react';
import ReactModal from 'react-modal'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
}

export const SearchApuModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    width: '1133px',
                    margin: 'auto',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '40px',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "start",
                    height: '713px'
                },
            }}
        >
            {children}
        </ReactModal>
    );
};

