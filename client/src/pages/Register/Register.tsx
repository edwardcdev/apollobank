import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
    useRegisterMutation,
    RegisterMutationVariables,
    RegisterMutation,
} from '../../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { Button, ThemeProvider } from '@material-ui/core';
import { theme } from '../../utils/theme';
import { registerValidationSchema } from '../../schemas /registerValidationSchema';
import { FormTextField, FormDatePicker } from '../../components/Forms/FormTextField';
import { ErrorMessage } from '../../components/Alerts/AlertMessage';
import { useRegisterStyles } from './Register.style';
import { MutationTuple } from '@apollo/react-hooks';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    // GraphQL Mutations
    const [register]: MutationTuple<
        RegisterMutation,
        RegisterMutationVariables
    > = useRegisterMutation();

    // State
    const [errorMessage, setErrorMessage] = useState<string>('');

    const classes = useRegisterStyles();

    return (
        <div>
            <div>
                <h1 className={classes.headerText}>Sign Up</h1>
            </div>
            {errorMessage.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ErrorMessage message={errorMessage} />
                </div>
            )}
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    streetAddres: '',
                    postCode: '',
                    city: '',
                    country: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    dateOfBirth: '',
                }}
                validationSchema={registerValidationSchema}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    // On the register button click, call the register mutation
                    const response = await register({
                        variables: {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            password: data.password,
                            streetAddress: data.streetAddres,
                            postCode: data.postCode,
                            city: data.city,
                            country: data.country,
                            dateOfBirth: data.dateOfBirth,
                        },
                    });

                    // if the register was successful, route the user to the login page
                    if (response.data?.register) {
                        history.push('/login');
                        setSubmitting(false);
                        resetForm();
                    } else {
                        setErrorMessage('User with that email already exists.');
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <div className={classes.root}>
                        <Form onChange={() => setErrorMessage('')}>
                            <div className={classes.alignedFormContent}>
                                <FormTextField
                                    className={classes.alignedFormField}
                                    name="firstName"
                                    placeholder="First name"
                                    type="input"
                                />
                                <div className={classes.spacer} />
                                <FormTextField
                                    className={classes.alignedFormField}
                                    name="lastName"
                                    placeholder="Last name"
                                    type="input"
                                />
                            </div>
                            <div>
                                <div className={classes.alignedFormContent}>
                                    <FormTextField
                                        className={classes.alignedFormField}
                                        name="streetAddres"
                                        placeholder="Street address"
                                        type="input"
                                    />
                                    <div className={classes.spacer} />
                                    <FormTextField
                                        className={classes.alignedFormField}
                                        name="postCode"
                                        placeholder="Post code"
                                        type="input"
                                    />
                                </div>
                                <div className={classes.alignedFormContent}>
                                    <FormTextField
                                        className={classes.alignedFormField}
                                        name="city"
                                        placeholder="City"
                                        type="input"
                                    />
                                    <div className={classes.spacer} />
                                    <FormTextField
                                        className={classes.alignedFormField}
                                        name="country"
                                        placeholder="Country"
                                        type="input"
                                    />
                                </div>
                                <FormTextField
                                    className={classes.formField}
                                    name="email"
                                    placeholder="Email"
                                    type="input"
                                />
                                <FormTextField
                                    className={classes.formField}
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                />
                                <FormTextField
                                    className={classes.formField}
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    type="password"
                                />
                                <FormDatePicker className={classes.formField} name="dateOfBirth" />
                            </div>
                            <div className={classes.formButton}>
                                <ThemeProvider theme={theme}>
                                    <Button
                                        className={classes.formButton}
                                        disabled={isSubmitting}
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                    >
                                        Sign Up
                                    </Button>
                                </ThemeProvider>
                            </div>
                            <div className={classes.loginText}>
                                <p>
                                    Already have an account? <a href="/login">Login here.</a>
                                </p>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};
