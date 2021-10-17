import React from 'react';
import { ColorScheme } from '../utils/theme';

export const Bye: React.FC = () => {
    return (
        <>
            <div style={{ margin: '0 auto', textAlign: 'center' }}>We're sad to see you go :(</div>
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
                <p>
                    Click{' '}
                    <a href="/" style={{ textDecoration: 'none', color: ColorScheme.SECONDARY }}>
                        here
                    </a>{' '}
                    to return back to the home page
                </p>
            </div>
        </>
    );
};
