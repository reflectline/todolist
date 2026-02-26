import {Checkbox} from '@mui/material';
import React from 'react';

type PropsType = {
    checked: boolean;
    callback: (isChecked: boolean) => void;
};

export const SuperCheckBox = (props: PropsType) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked);
    };

    return (
        <Checkbox
            checked={props.checked}
            onChange={onChangeHandler}
            color="success"
        />
    );
};