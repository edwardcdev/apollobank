import { createUseStyles } from 'react-jss';

export const useBackdropStyles = createUseStyles({
    backdrop: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,0.3)',
        zIndex: 100,
    },
});
