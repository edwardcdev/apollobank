import React, { MouseEvent } from 'react';
import { IconButton, Typography, Divider, Button, ThemeProvider } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddIcon from '@material-ui/icons/Add';
import { Title } from '../Typography/Title';
import { ColorScheme, theme } from '../../utils/theme';
import { useAccountsCardStyles, useNoAccountsCardStyles } from './styles/AccountsCard.style';

interface AccountsCardProps {
    svg: any | string;
    currencyIcon: string;
    fullCurrencyText: string;
    balance: number;
    iban: string;
    onAccountClicked(e: MouseEvent<HTMLButtonElement>): void;
}

interface NoAccountCardProps {
    onCreateNewAccountClicked(e: MouseEvent<HTMLButtonElement>): void;
}

export const AccountsCard: React.FC<AccountsCardProps> = ({
    svg,
    currencyIcon,
    fullCurrencyText,
    balance,
    iban,
    onAccountClicked,
}) => {
    const classes = useAccountsCardStyles();

    return (
        <>
            <div className={classes.root}>
                <div className={classes.svg}>{svg}</div>
                <Title title={fullCurrencyText} fontSize={18} />
                <div>
                    <IconButton style={{ color: ColorScheme.PRIMARY }} onClick={onAccountClicked}>
                        <NavigateNextIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            <Typography style={{ margin: '0 auto', marginTop: '24px' }} component="p" variant="h4">
                {currencyIcon}
                {balance}
            </Typography>
            <Divider style={{ marginTop: 24 }} light />
            <Typography
                style={{
                    marginTop: '14px',
                    letterSpacing: 1,
                    color: 'rgba(0, 0, 0, 0.3)',
                }}
                component="p"
            >
                {!!iban ? iban : 'XXXX APL0 0099 YYYY ZZZZ 78'}
            </Typography>
        </>
    );
};

export const NoAccountsCard: React.FC<NoAccountCardProps> = ({ onCreateNewAccountClicked }) => {
    const classes = useNoAccountsCardStyles();
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Button
                    style={{ fontWeight: 'bold', textTransform: 'none', letterSpacing: 1 }}
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onCreateNewAccountClicked}
                >
                    Create new account
                </Button>
            </ThemeProvider>
        </div>
    );
};
