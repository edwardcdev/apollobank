import React from 'react';
import { Typography } from '@material-ui/core';
import { ColorScheme } from '../../utils/theme';

interface TitleProps {
    title: string;
    fontSize: number;
}

export const Title: React.FC<TitleProps> = (props: TitleProps) => {
    return (
        <Typography
            style={{ fontWeight: 'bold', fontSize: props.fontSize, color: ColorScheme.PRIMARY }}
        >
            {props.title}
        </Typography>
    );
};
