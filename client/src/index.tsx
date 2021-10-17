import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import { getAccessToken, setAccessToken } from './utils/accessToken';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { App } from './App';

// Setup Apollo Client manually without Apollo Boost
// https://www.apollographql.com/docs/react/migrating/boost-migration/

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable(observer => {
            let handle: any;
            Promise.resolve(operation)
                .then(operation => {
                    const accessToken = getAccessToken();
                    operation.setContext({
                        headers: {
                            authorization: accessToken ? `Bearer ${accessToken}` : '',
                        },
                    });
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                .catch(observer.error.bind(observer));

            return () => {
                if (handle) handle.unsubscribe();
            };
        }),
);

const client = new ApolloClient({
    link: ApolloLink.from([
        new TokenRefreshLink({
            accessTokenField: 'accessToken',
            isTokenValidOrUndefined: () => {
                const token = getAccessToken();

                if (!token) {
                    return true;
                }

                try {
                    const { exp } = jwtDecode(token);
                    if (Date.now() >= exp * 1000) {
                        return false;
                    } else {
                        return true;
                    }
                } catch {
                    return false;
                }
            },
            fetchAccessToken: () => {
                return fetch((process.env.REACT_APP_SERVER_URL as string) + '/refresh_token', {
                    method: 'POST',
                    credentials: 'include',
                });
            },
            handleFetch: accessToken => {
                setAccessToken(accessToken);
            },
            handleError: err => {
                console.warn('Your refresh token is invalid. Try to relogin');
                console.error(err);
            },
        }),
        onError(({ graphQLErrors, networkError }) => {
            console.log(graphQLErrors);
            console.log(networkError);
        }),
        requestLink,
        new HttpLink({
            uri: process.env.REACT_APP_SERVER_URL + '/graphql',
            credentials: 'include',
        }),
    ]),
    cache,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);
