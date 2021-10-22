import React, { useState, useEffect } from 'react';
import {
    useMeQuery,
    MeQueryResult,
    useAccountsQuery,
    AccountsQueryResult,
    Account,
    useUpdatePasswordMutation,
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables,
    DestroyAccountMutation,
    DestroyAccountMutationVariables,
    LogoutMutationVariables,
    useLogoutMutation,
    LogoutMutation,
    useDestroyAccountMutation,
} from '../../generated/graphql';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ThemeProvider,
    Button,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InfoIcon from '@material-ui/icons/Info';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Title } from '../../components/Typography/Title';
import { Dialog } from '../../components/Dialog/Dialog';
import { ReactComponent as Euro } from '../../assets/world.svg';
import { ReactComponent as Dollar } from '../../assets/flag.svg';
import { ReactComponent as Pound } from '../../assets/uk.svg';
import { useHistory } from 'react-router-dom';
import { MutationTuple } from '@apollo/react-hooks';
import { Formik, Form } from 'formik';
import { FormTextField } from '../../components/Forms/FormTextField';
import { theme, ColorScheme } from '../../utils/theme';
import { SuccessMessage, ErrorMessage } from '../../components/Alerts/AlertMessage';
import { changePasswordValidationSchema } from '../../schemas/changePasswordValidationSchema';
import { ExecutionResultDataDefault, ExecutionResult } from 'graphql/execution/execute';
import { setAccessToken } from '../../utils/accessToken';
import { Loading } from '../../components/Loading/Loading';

export const Settings: React.FC = () => {
    // GraphQL Queries
    const { data }: MeQueryResult = useMeQuery();
    const accounts: AccountsQueryResult = useAccountsQuery();

    // GraphQL Mutations
    const [updatePassword]: MutationTuple<
        UpdatePasswordMutation,
        UpdatePasswordMutationVariables
    > = useUpdatePasswordMutation();
    const [destroyAccount]: MutationTuple<
        DestroyAccountMutation,
        DestroyAccountMutationVariables
    > = useDestroyAccountMutation();
    const [logout, { client }]: MutationTuple<
        LogoutMutation,
        LogoutMutationVariables
    > = useLogoutMutation();

    // State
    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(false);
    const [openPersonalDetailsDialog, setOpenPersonalDetailsDialog] = useState<boolean>(false);
    const [openAccountDetailsDialog, setOpenAccountDetailsDialog] = useState<boolean>(false);
    const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState<boolean>(false);
    const [openAboutDialog, setOpenAboutDialog] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [userBirthDate, setUserBirthDate] = useState<string>('');

    const history = useHistory();

    // When the component mounts, format the logged in users date of birth
    useEffect(() => {
        if (data && data.me) {
            setUserBirthDate(new Date(Date.parse(data.me.dateOfBirth)).toLocaleDateString());
        }
    }, [data]);

    const renderPersonalDetailsDialog = (): JSX.Element => {
        return (
            <Dialog
                isOpen={openPersonalDetailsDialog}
                onClose={() => setOpenPersonalDetailsDialog(false)}
            >
                <Title title="Personal details" fontSize={18} />
                <div style={{ marginTop: 12 }}>
                    <p style={{ color: 'lightgrey' }}>Full name & date of birth</p>
                    {data &&
                        data.me &&
                        data.me.firstName + ' ' + data.me.lastName + ', ' + userBirthDate}
                    <p style={{ color: 'lightgrey' }}>Residential address</p>
                    {data && data.me && data.me.streetAddress} <br />
                    {data && data.me && data.me.postCode + ' ' + data.me.city} <br />
                    {data && data.me && data.me.country}
                    <p style={{ color: 'lightgrey' }}>Email</p>
                    {data && data.me && data.me.email}
                </div>
            </Dialog>
        );
    };

    const renderAccountDetailsDialog = (): JSX.Element => {
        return (
            <Dialog
                isOpen={openAccountDetailsDialog}
                onClose={() => setOpenAccountDetailsDialog(false)}
            >
                <Title title="Account details" fontSize={18} />
                <div style={{ marginTop: 12 }}>
                    <p style={{ color: 'lightgrey' }}>Active accounts</p>
                    <List component="nav" aria-label="active-accounts">
                        {accounts.data &&
                            accounts.data.accounts.map((account: Account) => {
                                let svg: any;
                                let currencyFullText: string = '';
                                let balance: string = '';

                                switch (account.currency) {
                                    case 'EUR':
                                        svg = <Euro />;
                                        currencyFullText = 'Euro';
                                        balance = '€' + account.balance;
                                        break;
                                    case 'USD':
                                        svg = <Dollar />;
                                        currencyFullText = 'US Dollar';
                                        balance = '$' + account.balance;
                                        break;
                                    case 'GBP':
                                        svg = <Pound />;
                                        currencyFullText = 'British Pound';
                                        balance = '£' + account.balance;
                                        break;
                                }

                                return (
                                    <ListItem
                                        key={account.id}
                                        button
                                        onClick={() =>
                                            history.push({
                                                pathname: `/accounts/${account.id}`,
                                                state: account,
                                            })
                                        }
                                    >
                                        <ListItemIcon>
                                            <div style={{ width: 32 }}>{svg}</div>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={currencyFullText}
                                            secondary={account.currency}
                                        />
                                        {balance}
                                    </ListItem>
                                );
                            })}
                    </List>
                </div>
            </Dialog>
        );
    };

    const renderChangePasswordDialog = (): JSX.Element => {
        return (
            <Dialog
                isOpen={openChangePasswordDialog}
                onClose={() => setOpenChangePasswordDialog(false)}
            >
                <Title title="Change password" fontSize={18} />
                <div style={{ marginTop: 12 }}>
                    <Formik
                        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                        validationSchema={changePasswordValidationSchema}
                        onSubmit={async (data, { setSubmitting, resetForm }) => {
                            setSubmitting(true);

                            // On change password clicked, call the updatePassword mutation
                            try {
                                const response = await updatePassword({
                                    variables: {
                                        oldPassword: data.oldPassword,
                                        newPassword: data.newPassword,
                                    },
                                });

                                if (response && response.data) {
                                    setSubmitting(false);
                                    setSuccessMessage('Password successfully changed!');
                                    setOpenChangePasswordDialog(false);
                                    resetForm();
                                }
                            } catch (error) {
                                const errorMessage = error.message.split(':')[1];
                                setErrorMessage(errorMessage);
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <FormTextField
                                        name="oldPassword"
                                        placeholder="Old password"
                                        type="password"
                                    />
                                    <div style={{ marginTop: 8 }}>
                                        <FormTextField
                                            name="newPassword"
                                            placeholder="New password"
                                            type="password"
                                        />
                                    </div>
                                    <div style={{ marginTop: 8 }}>
                                        <FormTextField
                                            name="confirmPassword"
                                            placeholder="Confirm new password"
                                            type="password"
                                        />
                                    </div>
                                    <div style={{ marginTop: 8 }}>
                                        <ThemeProvider theme={theme}>
                                            <Button
                                                disabled={isSubmitting}
                                                variant="contained"
                                                color="secondary"
                                                type="submit"
                                            >
                                                Change password
                                            </Button>
                                        </ThemeProvider>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </Dialog>
        );
    };

    const renderAboutDialog = (): JSX.Element => {
        return (
            <Dialog isOpen={openAboutDialog} onClose={() => setOpenAboutDialog(false)}>
                <Title title="About this website" fontSize={18} />
                <div style={{ marginTop: 12 }}>Libraries used:</div>
                <div style={{ marginTop: 12 }}>
                    Server side technologies
                    <ul>
                        <li>
                            <a
                                href="https://www.apollographql.com/docs/apollo-server/"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Apollo Server
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.npmjs.com/package/bcryptjs"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                bcryptjs
                            </a>{' '}
                            for password hashing
                        </li>
                        <li>
                            <a
                                href="https://www.npmjs.com/package/cors"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                cors
                            </a>{' '}
                            for cross origin resource sharing
                        </li>
                        <li>
                            <a
                                href="https://expressjs.com/"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Express
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://graphql.org/"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GraphQL
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.npmjs.com/package/jsonwebtoken"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                jsonwebtoken
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://typegraphql.com/"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                TypeGraphQL
                            </a>{' '}
                            for GraphQLI API TypeScript integration
                        </li>
                        <li>
                            <a
                                href="https://typeorm.io/#/"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                TypeORM
                            </a>{' '}
                            - Typescript ORM to use with databases (PostgreSQL in my case)
                        </li>
                        <li>
                            <a
                                href="https://www.typescriptlang.org/"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                TypeScript
                            </a>
                        </li>
                    </ul>
                    Client side technologies
                    <ul>
                        <li>
                            <a
                                href="https://www.apollographql.com/docs/react/api/react-hooks/"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Apollo React Hooks
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://fontawesome.com/how-to-use/on-the-web/using-with/react"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                FontAwesome Icons
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://material-ui.com/"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Material UI
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://recharts.org/en-US/"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Recharts
                            </a>{' '}
                            - For data visualization
                        </li>
                        <li>
                            <a
                                href="https://jaredpalmer.com/formik/"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Formik
                            </a>{' '}
                            - For building Forms
                        </li>
                        <li>
                            <a
                                href="https://github.com/jquense/yup"
                                style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Yup
                            </a>{' '}
                            - For client sid form validation
                        </li>
                    </ul>
                </div>
            </Dialog>
        );
    };

    const renderAlertMessage = (): JSX.Element | undefined => {
        if (successMessage.length > 0) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                    <SuccessMessage message={successMessage} />
                </div>
            );
        } else if (errorMessage.length > 0) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                    <ErrorMessage message={errorMessage} />
                </div>
            );
        }
    };

    if (!showLoadingIcon) {
        return (
            <>
                <div>
                    {renderPersonalDetailsDialog()}
                    {renderAccountDetailsDialog()}
                    {renderChangePasswordDialog()}
                    {renderAboutDialog()}
                    {renderAlertMessage()}
                    <div style={{ textAlign: 'center' }}>
                        <AccountCircleIcon fontSize={'large'} />
                        <Title
                            title={
                                !!data && data.me ? data.me.firstName + ' ' + data.me.lastName : ''
                            }
                            fontSize={18}
                        />
                    </div>
                    <hr style={{ width: '424px' }} />
                    <div style={{ width: '424px', margin: '0 auto' }}>
                        <Title title="Profile" fontSize={14} />
                        <List component="nav" aria-label="profile">
                            <ListItem button onClick={() => setOpenPersonalDetailsDialog(true)}>
                                <ListItemIcon style={{ color: ColorScheme.PRIMARY }}>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Personal details" />
                            </ListItem>
                            <ListItem button onClick={() => setOpenAccountDetailsDialog(true)}>
                                <ListItemIcon style={{ color: ColorScheme.PRIMARY }}>
                                    <AccountBalanceIcon />
                                </ListItemIcon>
                                <ListItemText primary="Account details" />
                            </ListItem>
                        </List>
                    </div>
                    <hr style={{ width: '424px' }} />
                    <div style={{ width: '424px', margin: '0 auto' }}>
                        <Title title="Security" fontSize={14} />
                        <List component="nav" aria-label="profile">
                            <ListItem button onClick={() => setOpenChangePasswordDialog(true)}>
                                <ListItemIcon style={{ color: ColorScheme.PRIMARY }}>
                                    <VpnKeyIcon />
                                </ListItemIcon>
                                <ListItemText primary="Change password" />
                            </ListItem>
                        </List>
                    </div>
                    <hr style={{ width: '424px' }} />
                    <div style={{ width: '424px', margin: '0 auto' }}>
                        <Title title="About us" fontSize={14} />
                        <List component="nav" aria-label="profile">
                            <ListItem button onClick={() => setOpenAboutDialog(true)}>
                                <ListItemIcon style={{ color: ColorScheme.PRIMARY }}>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="About this website" />
                            </ListItem>
                        </List>
                    </div>
                    <hr style={{ width: '424px' }} />
                    <div style={{ width: '424px', margin: '0 auto' }}>
                        <List component="nav" aria-label="profile">
                            <ListItem
                                button
                                onClick={async () => {
                                    try {
                                        const response: ExecutionResult<ExecutionResultDataDefault> = await destroyAccount();

                                        if (response && response.data) {
                                            setShowLoadingIcon(true);
                                            setTimeout(async () => {
                                                await logout().then(() => history.push('/bye'));
                                                setAccessToken('');
                                                client!.resetStore();
                                            }, 3000);
                                        }
                                    } catch (error) {
                                        const errorMessage: string = error.message.split(':')[1];
                                        console.log(errorMessage);
                                    }
                                }}
                            >
                                <ListItemIcon style={{ color: ColorScheme.PRIMARY }}>
                                    <DeleteForeverIcon />
                                </ListItemIcon>
                                <ListItemText primary="Destroy account" />
                            </ListItem>
                        </List>
                    </div>
                </div>
            </>
        );
    } else {
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
};
