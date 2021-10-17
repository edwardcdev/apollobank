import React, { useState, useEffect, MouseEvent } from 'react';
import { useToolbarStyles } from './Toolbar.style';
import { DrawerToggleButton } from '../SideDrawer/DrawerToggleButton';
import {
    useMeQuery,
    useLogoutMutation,
    MeQueryResult,
    LogoutMutation,
    LogoutMutationVariables,
} from '../../generated/graphql';
import { useHistory } from 'react-router-dom';
import { setAccessToken } from '../../utils/accessToken';
import { MutationTuple } from '@apollo/react-hooks';

interface ToolbarProps {
    drawerClickHandler(): void;
}

const navigationItems: string[] = ['Dashboard', 'Settings'];

export const Toolbar: React.FC<ToolbarProps> = (props: ToolbarProps) => {
    // GraphQL Mutations
    const [logout, { client }]: MutationTuple<
        LogoutMutation,
        LogoutMutationVariables
    > = useLogoutMutation();

    // GraphQL Queries
    const { data, loading }: MeQueryResult = useMeQuery();

    // State
    const [showAuthUserButtons, setShowAuthUserButtons] = useState<boolean>(false);

    const history = useHistory();

    const classes = useToolbarStyles();

    // When the component mounts, if the user exists render the authenticated buttons, otherwise the non-authenticated buttons
    // Authenticated user buttons -> Dashboard, Settings, Logout
    // Non-authenticated user buttons -> Login, Sign Up
    useEffect(() => {
        if (!loading && data && data.me) {
            setShowAuthUserButtons(true);
        } else {
            setShowAuthUserButtons(false);
        }
    }, [data, loading]);

    const renderAuthUserButtons = (): JSX.Element => {
        return (
            <>
                {navigationItems.map((item: string) => {
                    let routeTo: string = '/';

                    switch (item) {
                        case 'Dashboard':
                            routeTo = '/dashboard';
                            break;
                        case 'Settings':
                            routeTo = '/settings';
                            break;
                    }
                    return (
                        <li key={item}>
                            <a href={routeTo}>{item}</a>
                        </li>
                    );
                })}
                <button
                    className={classes.navButton}
                    onClick={async e => {
                        e.preventDefault();
                        await logout().then(() => history.push('/'));
                        setAccessToken('');
                        await client!.resetStore();
                    }}
                >
                    Logout
                </button>
            </>
        );
    };

    const renderNonAuthUserButtons = (): JSX.Element => {
        return (
            <>
                <button
                    className={classes.navButton}
                    onClick={e => {
                        e.preventDefault();
                        history.push('/login');
                    }}
                >
                    Login
                </button>
                <button
                    className={classes.navButton}
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        history.push('/register');
                    }}
                >
                    Sign Up
                </button>
            </>
        );
    };

    return (
        <header className={classes.toolbar}>
            <nav className={classes.navigation}>
                <div className={classes.toggleButton}>
                    <DrawerToggleButton click={props.drawerClickHandler} />
                </div>
                <div className={classes.logo}>
                    <a href="/">
                        <span role="img" aria-label="logo">
                            🚀
                        </span>
                    </a>
                </div>
                <div className={classes.spacer} />
                <div className={classes.navigationItems}>
                    <ul>
                        {!!showAuthUserButtons
                            ? renderAuthUserButtons()
                            : renderNonAuthUserButtons()}
                    </ul>
                </div>
            </nav>
        </header>
    );
};
