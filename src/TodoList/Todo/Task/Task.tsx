import React, {useCallback} from 'react';
import s from '../TodoList.module.css';
import {SuperCheckBox} from '../../../SuperCheckBox/SuperCheckBox';
import {EditableSpan} from '../../../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskStatusType, TaskType} from '../../../api/todolistsAPI';


type TaskPropsType = {
    task: TaskType
    todoListId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, todolistId: string, status: TaskStatusType) => void
    changeTaskTitle: (taskId: string, todolistId: string, newValue: string) => void

}
export const Task = React.memo((props: TaskPropsType) => {


    const onClickRemoveHandler = () => {
        props.removeTask(props.task.id, props.todoListId)
    }

    const onChangeCheckBoxHandler = useCallback((isDone: boolean) => {

        let status = isDone ? TaskStatusType.Completed : TaskStatusType.New;
        props.changeTaskStatus(props.task.id, props.todoListId, status);
    }, [props.task.id, props.todoListId])

    const onChangeTitleHandler = useCallback((newValue: string) => {

        props.changeTaskTitle(props.task.id, props.todoListId, newValue)
    }, [props.task.id, props.todoListId])

    return (
        <div className={`${s.task} ${props.task.status === TaskStatusType.Completed ? s.isDone : ''}`}
             key={props.task.id}>
            <div className={s.checkboxTitle}>
                <SuperCheckBox checked={props.task.status === TaskStatusType.Completed}
                               callback={(isDone) => onChangeCheckBoxHandler(isDone)}/>
                <EditableSpan title={props.task.title} onChangeTitleHandler={onChangeTitleHandler}/>
            </div>
            <div className={s.deleteButtons}>
                <IconButton onClick={onClickRemoveHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
})