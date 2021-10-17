import { createUseStyles } from 'react-jss';

export const useAccountsCardStyles = createUseStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    svg: {
        width: 32,
    },
});

export const useNoAccountsCardStyles = createUseStyles({
    root: {
        display: 'flex',
        marginTop: '62px',
        justifyContent: 'center',
    },
});
