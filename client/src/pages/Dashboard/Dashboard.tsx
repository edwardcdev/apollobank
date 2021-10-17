import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import {
    Container,
    Grid,
    Paper,
    List,
    ListItemText,
    ListItem,
    ListItemIcon,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ThemeProvider,
} from '@material-ui/core';
import { Chart } from '../../components/Charts/Chart';
import { Title } from '../../components/Typography/Title';
import { ReactComponent as Euro } from '../../assets/world.svg';
import { ReactComponent as Dollar } from '../../assets/flag.svg';
import { ReactComponent as Pound } from '../../assets/uk.svg';
import {
    useAccountsQuery,
    useCreateAccountMutation,
    AccountsDocument,
    useCreateCardMutation,
    useCardsQuery,
    CardsDocument,
    AccountsQueryResult,
    CardsQueryResult,
    CreateAccountMutation,
    CreateAccountMutationVariables,
    CreateCardMutation,
    CreateCardMutationVariables,
    Account,
} from '../../generated/graphql';
import { Loading } from '../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { AccountsCard, NoAccountsCard } from '../../components/Cards/AccountsCard';
import { Dialog } from '../../components/Dialog/Dialog';
import { NoApolloCard, ApolloCard } from '../../components/Cards/ApolloCard';
import { MutationTuple } from '@apollo/react-hooks';
import { ExecutionResult } from 'graphql';
import { theme } from '../../utils/theme';
import { useDashboardStyles } from './styles/Dashboard.style';

const GLOBAL_CURRENCIES: string[] = ['EUR', 'USD', 'GBP'];

export const Dashboard: React.FC = () => {
    // GraphQL Mutations
    const [createAccount]: MutationTuple<
        CreateAccountMutation,
        CreateAccountMutationVariables
    > = useCreateAccountMutation();
    const [createCard]: MutationTuple<
        CreateCardMutation,
        CreateCardMutationVariables
    > = useCreateCardMutation();

    // GraphQL Queries
    const { data, loading }: AccountsQueryResult = useAccountsQuery();
    const cards: CardsQueryResult = useCardsQuery();

    // State
    const [currencies, setCurrencies] = useState<string[]>(['']);
    const [analyticsAccount, setAnalyticsAccount] = useState<string>('');
    const [totalBalance, setTotalBalance] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const history = useHistory();

    const classes = useDashboardStyles();

    const accountCardHeightPaper = classes.paper + ' ' + classes.accountCardHeight;
    const apolloCardPaper =
        classes.paper + ' ' + classes.accountCardHeight + ' ' + classes.apolloCard;
    const chartPaper = classes.paper + ' ' + classes.chart;

    // When the component mounts, update the total balance for the current user
    // and store the currency accounts in the state array
    useEffect(() => {
        let currencies: string[] = [];
        let balance: number = 0;
        if (data) {
            data.accounts.forEach((account: Account) => {
                // apply conversion rates
                if (account.currency === 'EUR') {
                    balance += Math.round(account.balance / 1.13);
                }

                if (account.currency === 'USD') {
                    balance += Math.round(account.balance / 1.25);
                }

                if (account.currency === 'GBP') {
                    balance += Math.round(account.balance * 1);
                }
                currencies.push(account.currency);
            });
        }
        setTotalBalance(balance);
        setCurrencies(currencies);
    }, [loading, data]);

    // When the component mounts, if an exists, set the analytics to display data for the first account
    useEffect(() => {
        if (currencies.length > 0) {
            setAnalyticsAccount(currencies[0]);
        }
    }, [currencies]);

    if (!data) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Loading />
            </div>
        );
    }

    const determineCurrencyIcon = (c: string): JSX.Element | undefined => {
        switch (c) {
            case 'EUR':
                return <Euro />;
            case 'USD':
                return <Dollar />;
            case 'GBP':
                return <Pound />;
        }
        return undefined;
    };

    const renderDialog = (): JSX.Element => {
        return (
            <Dialog isOpen={openDialog} onClose={() => setOpenDialog(false)}>
                <List>
                    {GLOBAL_CURRENCIES.map((currency: string) => (
                        <ListItem
                            button
                            key={currency}
                            onClick={async () => {
                                // Call the createAccount mutation
                                try {
                                    const response: ExecutionResult<CreateAccountMutation> = await createAccount(
                                        {
                                            variables: {
                                                currency: currency,
                                            },
                                            refetchQueries: [
                                                {
                                                    query: AccountsDocument,
                                                    variables: {},
                                                },
                                                {
                                                    query: CardsDocument,
                                                    variables: {},
                                                },
                                            ],
                                        },
                                    );

                                    if (response && response.data) {
                                        setAnalyticsAccount(currency);
                                        setOpenDialog(false);
                                    }
                                } catch (error) {
                                    const errorMessage: string = error.message.split(':')[1];
                                    console.log(errorMessage);
                                }
                            }}
                        >
                            <ListItemIcon>
                                <div style={{ width: 32 }}>{determineCurrencyIcon(currency)}</div>
                            </ListItemIcon>
                            <ListItemText primary={currency} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        );
    };

    const handleAccountClicked = (e: MouseEvent<HTMLButtonElement>, account: Account): void => {
        e.preventDefault();
        history.push({
            pathname: `/accounts/${account.id}`,
            state: account,
        });
    };

    const handleCreateNewCardClicked = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();

        try {
            // Call the createCard mutation
            const response: ExecutionResult<CreateCardMutation> = await createCard({
                variables: {},
                refetchQueries: [
                    {
                        query: CardsDocument,
                        variables: {},
                    },
                ],
            });

            if (response && response.data) {
                console.log('Card successfully created!');
            }
        } catch (error) {
            const errorMessage: string = error.message.split(':')[1];
            console.log(errorMessage);
        }
    };

    const renderNoAccountsCard = (): JSX.Element => {
        return (
            <>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={accountCardHeightPaper}>
                        <NoAccountsCard
                            onCreateNewAccountClicked={(e: MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                setOpenDialog(true);
                            }}
                        />
                    </Paper>
                </Grid>
            </>
        );
    };

    const renderNoApolloCard = (): JSX.Element => {
        return (
            <>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={accountCardHeightPaper}>
                        <NoApolloCard
                            onCreateNewCardClicked={(e: MouseEvent<HTMLButtonElement>) => {
                                handleCreateNewCardClicked(e);
                            }}
                        />
                    </Paper>
                </Grid>
            </>
        );
    };

    const renderChartOptions = (): JSX.Element => {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <FormControl>
                        <InputLabel id="select-filled-label">Account</InputLabel>
                        <Select
                            labelId="select-filled-label"
                            id="select-filled"
                            value={analyticsAccount}
                            onChange={(event: ChangeEvent<{ value: unknown }>) =>
                                setAnalyticsAccount(event.target.value as string)
                            }
                            label="Account"
                        >
                            {currencies.map((currency: string) => {
                                return (
                                    <MenuItem key={currency} value={currency}>
                                        {currency}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </ThemeProvider>
            </>
        );
    };

    return (
        <div className={classes.root}>
            {renderDialog()}
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <div
                        style={{
                            marginBottom: 12,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <Title title="Analytics" fontSize={24} />
                        </div>
                    </div>
                    {data && data.accounts.length > 0 ? renderChartOptions() : undefined}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={chartPaper}>
                                <Chart currency={!!analyticsAccount ? analyticsAccount : 'EUR'} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth="lg" className={classes.container}>
                    <div
                        style={{
                            marginBottom: 12,
                            marginTop: 12,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <Title title="Accounts" fontSize={24} />
                        </div>
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            Total balance: £{totalBalance}
                        </div>
                    </div>
                    <Grid container spacing={3}>
                        {data.accounts.length > 0 &&
                            data.accounts.map((account: Account) => {
                                let svg: any | string;
                                let currencyIcon: string = '';
                                let fullCurrencyText: string = '';

                                switch (account.currency) {
                                    case GLOBAL_CURRENCIES[0]:
                                        svg = <Euro />;
                                        currencyIcon = '€';
                                        fullCurrencyText = 'Euro';
                                        break;
                                    case GLOBAL_CURRENCIES[1]:
                                        svg = <Dollar />;
                                        currencyIcon = '$';
                                        fullCurrencyText = 'US Dollar';
                                        break;
                                    case GLOBAL_CURRENCIES[2]:
                                        svg = <Pound />;
                                        currencyIcon = '£';
                                        fullCurrencyText = 'British Pound';
                                        break;
                                }
                                return (
                                    <Grid key={account.id} item xs={12} md={4} lg={4}>
                                        <Paper className={accountCardHeightPaper}>
                                            <AccountsCard
                                                svg={svg}
                                                currencyIcon={currencyIcon}
                                                fullCurrencyText={fullCurrencyText}
                                                balance={account.balance}
                                                iban={account.iban}
                                                onAccountClicked={(
                                                    e: MouseEvent<HTMLButtonElement>,
                                                ) => handleAccountClicked(e, account)}
                                            />
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        {data.accounts.length <= 2 && renderNoAccountsCard()}
                    </Grid>
                </Container>
                <Container maxWidth="lg" className={classes.container}>
                    <div style={{ marginBottom: 12 }}>
                        <Title title="Cards" fontSize={24} />
                    </div>
                    <Grid container spacing={3}>
                        {cards.data &&
                            cards.data.cards &&
                            cards.data.cards.length > 0 &&
                            cards.data.cards.map(card => {
                                return (
                                    <Grid key={card.id} item xs={12} md={4} lg={4}>
                                        <Paper className={apolloCardPaper}>
                                            <ApolloCard
                                                cardNumber={card.cardNumber}
                                                validThru={
                                                    new Date(
                                                        Date.parse(card.expiresIn),
                                                    ).getMonth() +
                                                    '/' +
                                                    new Date(Date.parse(card.expiresIn))
                                                        .getFullYear()
                                                        .toString()
                                                        .substr(-2)
                                                }
                                                cvv={card.cvv}
                                            />
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        {cards.data && cards.data.cards.length <= 2 && renderNoApolloCard()}
                    </Grid>
                </Container>
            </main>
        </div>
    );
};
