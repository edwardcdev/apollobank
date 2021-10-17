import { createUseStyles } from 'react-jss';
import { ColorScheme } from '../../utils/theme';

export const useDialogStyles = createUseStyles({
    dialog: {
        width: '500px',
        maxWidth: '100%',
        margin: '0 auto',
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        backgroundColor: 'white',
        padding: '10px 20px 40px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '3px 7px 18px 0px rgba(148,148,148,1)',
    },
    closeButton: {
        backgroundColor: ColorScheme.PRIMARY,
        color: ColorScheme.WHITE,
        fontSize: 16,
        outline: 'none',
        marginBottom: '15px',
        padding: '3px 8px',
        cursor: 'pointer',
        borderRadius: '50%',
        border: 'none',
        width: '30px',
        height: '30px',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        '&:hover': {
            backgroundColor: ColorScheme.PRIMARY_HOVER,
        },
    },
});
