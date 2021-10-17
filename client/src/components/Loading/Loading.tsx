import React from 'react';
import { useLoadingStyles } from './Loading.style';

export const Loading: React.FC = () => {
    const classes = useLoadingStyles();

    return (
        <div className={classes.root}>
            <img className={classes.image} src="loading.svg" alt="Loading..." />
        </div>
    );
};
