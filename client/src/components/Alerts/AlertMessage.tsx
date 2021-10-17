import React from 'react';
import { Alert } from '@material-ui/lab';

interface AlertMessageProps {
    message: string;
}

export const SuccessMessage: React.FC<AlertMessageProps> = ({ message }) => {
    return (
        <Alert variant="outlined" severity="success">
            {message}
        </Alert>
    );
};

export const WarningMessage: React.FC<AlertMessageProps> = ({ message }) => {
    return (
        <Alert variant="outlined" severity="warning">
            {message}
        </Alert>
    );
};

export const ErrorMessage: React.FC<AlertMessageProps> = ({ message }) => {
    return (
        <Alert variant="outlined" severity="error">
            {message}
        </Alert>
    );
};
