import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './EditableSpan.module.css'
import TextField from '@mui/material/TextField';

export type EditableSpan = {
    title: string
    onChangeTitleHandler: (newValue: string) => void

}

export const EditableSpan = React.memo((props: EditableSpan)=> {

    const [editeMode, setEditeMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const activateEditeMode = () => {
        setEditeMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditeMode(false)
        props.onChangeTitleHandler(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        activateViewMode();
    };
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && activateViewMode();
    };

    return editeMode ?
        <TextField id="outlined-basic" label="Type value" variant="standard"
                   className={s.input}
                   value={title}
                   onChange={onChangeHandler}
                   onBlur={onBlurHandler}
                   onKeyDown={onKeyDownHandler}
                   autoFocus
        />
        : <span onDoubleClick={activateEditeMode}>{props.title}</span>
})
