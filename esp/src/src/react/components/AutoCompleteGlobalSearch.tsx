import * as React from 'react';
import {useTheme} from '@material-ui/core/styles';

interface AutoCompleteTheme {
    theme: object;
}

export const AutoCompleteGlobalSearch: React.FC<AutoCompleteTheme> = (props) => {
    const theme = useTheme<AutoCompleteTheme>();
    return (
        <span>{`spacing ${theme.theme}`}</span>
    )
}