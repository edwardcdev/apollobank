import React from 'react';
import { ColorScheme } from '../utils/theme';

interface Props {}

export const Home: React.FC<Props> = () => {
    return (
        <div style={{ height: '100vh', backgroundColor: ColorScheme.PRIMARY, marginTop: '-48px' }}>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div
                    style={{
                        color: ColorScheme.WHITE,
                        textTransform: 'uppercase',
                        letterSpacing: 10,
                        fontSize: 64,
                        fontWeight: 'bold',
                    }}
                >
                    APOLLO
                </div>
                <div style={{ color: ColorScheme.WHITE, letterSpacing: 8 }}>Banking made easy.</div>
            </div>
        </div>
    );
};
