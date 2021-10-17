import { createUseStyles } from 'react-jss';
import { ColorScheme } from '../../utils/theme';

export const useToolbarStyles = createUseStyles({
    toolbar: {
        // position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '56px',
        backgroundColor: ColorScheme.PRIMARY,
    },
    navigation: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        padding: '0 1rem',
    },
    logo: {
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginLeft: '1.5rem',
        '& a': {
            color: ColorScheme.WHITE,
            textDecoration: 'none',
            fontSize: '1.5rem',
        },
    },
    toggleButton: {},
    navigationItems: {
        '& ul': {
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
        },
        '& li': {
            padding: '0 0.5rem',
        },
        '& a': {
            color: ColorScheme.WHITE,
            letterSpacing: 1,
            textDecoration: 'none',
            fontWeight: 'bold',
        },
        '& a:hover': {
            color: ColorScheme.SECONDARY,
        },
        '& a:active': {
            color: ColorScheme.SECONDARY,
        },
    },
    navButton: {
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginLeft: '1rem',
        height: 32,
        width: 102,
        borderRadius: 4,
        border: 'none',
        backgroundColor: ColorScheme.SECONDARY,
        color: ColorScheme.WHITE,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: ColorScheme.HOVER,
        },
        '&:focus': {
            outline: 0,
        },
    },
    spacer: {
        flex: 1,
    },
    '@media (max-width: 768px)': {
        navigationItems: {
            display: 'none',
        },
    },
    '@media (min-width: 769px)': {
        toggleButton: {
            display: 'none',
        },
        logo: {
            marginLeft: 0,
        },
    },
});
