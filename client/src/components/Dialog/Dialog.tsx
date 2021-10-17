import React from 'react';
import { useDialogStyles } from './Dialog.style';

interface DialogProps {
    isOpen: boolean;
    onClose: any;
}

export const Dialog: React.FC<DialogProps> = ({ children, isOpen, onClose }) => {
    const classes = useDialogStyles();

    let dialog: JSX.Element | undefined = (
        <div className={classes.dialog}>
            <button className={classes.closeButton} onClick={onClose}>
                x
            </button>
            {children}
        </div>
    );

    if (!isOpen) {
        dialog = undefined;
    }
    return <div>{dialog}</div>;
};
