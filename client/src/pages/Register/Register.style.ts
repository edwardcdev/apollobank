import { makeStyles } from '@material-ui/core/styles';
import { ColorScheme } from '../../utils/theme';

export const useRegisterStyles = makeStyles({
    root: {
        margin: '0 auto',
        top: '25%',
        height: '100%',
        width: '348px',
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    alignedFormContent: {
        marginTop: 12,
        display: 'flex',
        width: '100%',
    },
    alignedFormField: {
        width: '50%',
    },
    formField: {
        width: '100%',
        marginTop: 12,
    },
    formButton: {
        marginTop: 12,
        textTransform: 'none',
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
        '&:disabled': {
            backgroundColor: ColorScheme.ORANGE,
            color: ColorScheme.WHITE,
        },
    },
    loginText: {
        margintop: 12,
    },
    spacer: {
        width: 8,
    },
});
