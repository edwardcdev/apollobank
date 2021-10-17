import React from 'react';
import { useBackdropStyles } from './Backdrop.style';

interface BackdropProps {
    click(): void;
}

export const Backdrop: React.FC<BackdropProps> = (props: BackdropProps) => {
    const classes = useBackdropStyles();

    return <div className={classes.backdrop} onClick={props.click} />;
};
