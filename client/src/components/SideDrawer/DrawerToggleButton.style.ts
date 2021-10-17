import { createUseStyles } from 'react-jss';

export const useDrawerToggleButtonStyles = createUseStyles({
    toggleButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '24px',
        width: '28px',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0,
        border: 'none',
        boxSizing: 'border-box',
        '& :focus': {
            outline: 'none',
        },
    },
    toggleButtonLine: {
        width: '30px',
        height: '2px',
        background: 'white',
    },
});
