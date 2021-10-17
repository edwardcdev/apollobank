import React, { MouseEvent } from 'react';
import { ThemeProvider, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { theme } from '../../utils/theme';
import { ReactComponent as MasterCard } from '../../assets/mc_symbol.svg';
import { useApolloCardStyles } from './styles/ApolloCard.style';

interface ApolloCardProps {
    cardNumber?: string;
    validThru?: string;
    cvv?: number;
    onCreateNewCardClicked?(e: MouseEvent<HTMLButtonElement>): void;
}

export const ApolloCard: React.FC<ApolloCardProps> = ({ cardNumber, validThru, cvv }) => {
    const classes = useApolloCardStyles();

    return (
        <>
            <div className={classes.cardTop}>
                <div>
                    <span role="img" aria-label="logo">
                        🚀
                    </span>
                </div>
                <div className={classes.cardTypeIcon}>
                    <MasterCard />
                </div>
            </div>
            <div className={classes.cardNumber}>{cardNumber}</div>
            <div style={{ display: 'flex' }}>
                <div>
                    <div className={classes.cardValidThruLabel}>valid thru</div>
                    <div>{validThru}</div>
                </div>
                <div>
                    <div className={classes.cardCvvLabel}>cvv</div>
                    <div style={{ marginLeft: 12 }}>{cvv}</div>
                </div>
            </div>
        </>
    );
};

export const NoApolloCard: React.FC<ApolloCardProps> = ({ onCreateNewCardClicked }) => {
    return (
        <div
            style={{
                display: 'flex',
                marginTop: '62px',
                justifyContent: 'center',
            }}
        >
            <ThemeProvider theme={theme}>
                <Button
                    style={{ fontWeight: 'bold', textTransform: 'none', letterSpacing: 1 }}
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onCreateNewCardClicked}
                >
                    Create new card
                </Button>
            </ThemeProvider>
        </div>
    );
};
