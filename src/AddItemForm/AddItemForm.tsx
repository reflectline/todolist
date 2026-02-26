import React from 'react';
import s from './AddItem.module.css'
import {TextField} from '@mui/material';
import ControlPoint from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import {useAddItemForm} from './hooks/useAddItemForm';

type PropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = React.memo(({addItem, disabled = false}: PropsType) => {
    console.log(disabled)
    const {
        newItemTitle,
        error,
        onNewTitleChangeHandler,
        onKeyPressHandler,
        onClickHandler,
    } = useAddItemForm(addItem)


    return (
        <>
            <div className={s.inpBtn}>
                <TextField id="outlined-basic" label="Type value" variant="standard" error={!!error}
                           helperText={!!error}
                           placeholder={'enter your text'}
                           value={newItemTitle}
                           onChange={onNewTitleChangeHandler}
                           onKeyDown={onKeyPressHandler}
                           type={'text'}
                           autoComplete="off"
                           disabled={disabled}

                />
                <IconButton
                    color="primary"
                    onClick={() => {
                        onClickHandler()
                    }}
                    disabled={disabled}>
                    <ControlPoint/>
                </IconButton>
            </div>
        </>
    )
})