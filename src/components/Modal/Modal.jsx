import React, { useEffect } from 'react'
import {createPortal} from 'react-dom'
import PropTypes from 'prop-types'

import { Window, Overlay } from './Modal.styled'

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {

    useEffect(() => {
        const handleKeyDown = ({ code }) => {
            if (code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])
    
    const onBackdropClick = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    
   
        return createPortal(
            <Overlay
                onClick={onBackdropClick}
            >
                <Window>
                    {children}
                </Window>
            </Overlay>,
            modalRoot,
        );
    
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
}

export default Modal