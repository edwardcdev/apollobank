import React, { useState, useEffect, MouseEvent } from 'react';
import { useSideDrawerStyles } from './SideDrawer.style';
import {
    useMeQuery,
    useLogoutMutation,
    MeQueryResult,
    LogoutMutationVariables,
    LogoutMutation,
} from '../../generated/graphql';
import { useHistory } from 'react-router-dom';
import { setAccessToken } from '../../utils/accessToken';
import { MutationTuple } from '@apollo/react-hooks';

const authUserNavigationItems: string[] = ['Dashboard', 'Settings', 'Logout'];
const nonAuthUserNavigationItems: string[] = ['Login', 'Sign Up'];

interface SideDrawerProps {
    show: boolean;
}

export const SideDrawer: React.FC<SideDrawerProps> = (props: SideDrawerProps) => {
    // GraphQL Mutations
    const [logout, { client }]: MutationTuple<
        LogoutMutation,
        LogoutMutationVariables
    > = useLogoutMutation();

    // GraphQL Queries
    const { data, loading }: MeQueryResult = useMeQuery();

    // State
    const [showAuthUserNavigationItems, setShowAuthUserNavigationItems] = useState<boolean>(false);

    const history = useHistory();
    const classes = useSideDrawerStyles();

    // When the component mounts, if the user exists render the authenticated buttons, otherwise the non-authenticated buttons
    // Authenticated user buttons -> Dashboard, Settings, Logout
    // Non-authenticated user buttons -> Login, Sign Up
    useEffect(() => {
        if (!loading && data && data.me) {
            setShowAuthUserNavigationItems(true);
        } else {
            setShowAuthUserNavigationItems(false);
        }
    }, [data, loading]);

    let drawerClasses: string = classes.siderDrawer;

    if (props.show) {
        drawerClasses = classes.siderDrawer + ' ' + classes.open;
    }

    const renderAuthUserNavigationItems = (): JSX.Element => {
        return (
            <>
                {authUserNavigationItems.map(item => {
                    let routeTo: string = '/';
                    let logOutClicked: boolean = false;

                    switch (item) {
                        case 'Dashboard':
                            routeTo = '/Dashboard';
                            break;
                        case 'Settings':
                            routeTo = '/settings';
                            break;
                        case 'Logout':
                            logOutClicked = true;
                            break;
                    }

                    return (
                        <li key={item}>
                            <a
                                href="/whatevs"
                                onClick={async (e: MouseEvent<Element, globalThis.MouseEvent>) => {
                                    e.preventDefault();
                                    if (logOutClicked) {
                                        await logout().then(() => history.push('/'));
                                        setAccessToken('');
                                        await client!.resetStore();
                                    }
                                    history.push(routeTo);
                                }}
                            >
                                {item}
                            </a>
                        </li>
                    );
                })}
            </>
        );
    };

    const renderNonAuthUserNavigationItems = (): JSX.Element => {
        return (
            <>
                {nonAuthUserNavigationItems.map((item: string) => {
                    let routeTo: string = '/';

                    switch (item) {
                        case 'Login':
                            routeTo = '/login';
                            break;
                        case 'Sign Up':
                            routeTo = '/register';
                            break;
                    }

                    return (
                        <li key={item}>
                            <a
                                href="/whatevs"
                                onClick={(
                                    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
                                ) => {
                                    e.preventDefault();
                                    history.push(routeTo);
                                }}
                            >
                                {item}
                            </a>
                        </li>
                    );
                })}
            </>
        );
    };

    return (
        <nav className={drawerClasses}>
            <ul>
                {!!showAuthUserNavigationItems
                    ? renderAuthUserNavigationItems()
                    : renderNonAuthUserNavigationItems()}
            </ul>
        </nav>
    );
};
