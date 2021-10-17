import React from 'react';
import { useDrawerToggleButtonStyles } from './DrawerToggleButton.style';

interface DrawerToggleButtonProps {
    click(): void;
}

export const DrawerToggleButton: React.FC<DrawerToggleButtonProps> = (
    props: DrawerToggleButtonProps,
) => {
    const classes = useDrawerToggleButtonStyles();

    return (
        <button className={classes.toggleButton} onClick={props.click}>
            <div className={classes.toggleButtonLine} />
            <div className={classes.toggleButtonLine} />
            <div className={classes.toggleButtonLine} />
        </button>
    );
};
