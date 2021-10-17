import { createUseStyles } from 'react-jss';

export const useApolloCardStyles = createUseStyles({
    cardTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTypeIcon: {
        width: 64,
    },
    cardNumber: {
        fontSize: 18,
        letterSpacing: 10,
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 24,
    },
    cardValidThruLabel: {
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        fontSize: 12,
        opacity: 0.9,
    },
    cardCvvLabel: {
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginLeft: 12,
        fontSize: 12,
        opacity: 0.9,
    },
});
