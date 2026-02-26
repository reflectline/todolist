import React, {useCallback, useEffect} from 'react';
import s from './TodoList.module.css'
import {AddItemForm} from '../../AddItemForm/AddItemForm';
import {EditableSpan} from '../../EditableSpan/EditableSpan';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, ThunkDispatchType} from '../../store';
import {addTaskTC, deleteTaskTC, fetchTasksTC, updateTaskTC} from './tasks-reducer';
import {v1} from 'uuid';
import {Task} from './Task/Task';
import {FilterValueType, TodolistDomainType} from './todolist-reducer';
import {TaskPriorities, TaskStatusType, TaskType} from '../../api/todolistsAPI';


type TodoListPropsType = {
    todolist: TodolistDomainType
    changeFilter: (value: FilterValueType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    demo: boolean
}


const TodoList = React.memo(({demo, ...props}: TodoListPropsType) => {
    const dispatch: ThunkDispatchType = useDispatch()
    const tasksObj = useSelector<AppRootStateType, TaskType[]>((state => state.tasks[props.todolist.id]))

    // useEffect(() => {
    //     if (demo) {
    //         return
    //     }
    //     dispatch(fetchTasksTC(props.todolist.id))
    // }, [props.todolist.id, dispatch])


    // Work With Tasks
    function removeTask(id: string, todoListId: string) {
        dispatch(deleteTaskTC(id, todoListId))
    }

    function changeTaskStatus(id: string, todoListId: string, status: TaskStatusType) {
        dispatch(updateTaskTC(id, todoListId, {status: status}))
    }

    function changeTaskTitle(id: string, todoListId: string, newTitle: string) {
        dispatch(updateTaskTC(id, todoListId, {title: newTitle}))
    }


    const onClickAllHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.changeFilter, props.todolist.id])
    const onClickActiveHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.changeFilter, props.todolist.id])
    const onClickCompletedHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.changeFilter, props.todolist.id])


    const removeTodoListHandler = () => {
        props.removeTodoList(props.todolist.id)
    }
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todolist.id, newTitle)
    }, [props.changeTodoListTitle, props.todolist.id])

    const addTask = useCallback((title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            status: TaskStatusType.New,
            todoListId: props.todolist.id,
            startDate: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.low,
            deadline: '',
            description: ''
        };
        dispatch(addTaskTC(newTask, props.todolist.id))
    }, [props.todolist.id])

    let tasksForTodoList = tasksObj;

    if (props.todolist.filter === 'completed') {
        tasksForTodoList = tasksForTodoList?.filter(t => t.status === TaskStatusType.Completed)
    }
    if (props.todolist.filter === 'active') {
        tasksForTodoList = tasksForTodoList?.filter(t => t.status === TaskStatusType.InProgress || t.status === TaskStatusType.New)
    }


    return (
        <div className={s.todolist}>
            <div className={s.closeButtonAndTitle}>
                <h3><EditableSpan title={props.todolist.title} onChangeTitleHandler={changeTodoListTitle}/></h3>
                <IconButton onClick={removeTodoListHandler} disabled={props.todolist.entityStatus === 'loading'}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>{
                tasksForTodoList.map(t => {
                    return <Task key={t.id} todoListId={props.todolist.id} task={t}
                                 removeTask={removeTask}
                                 changeTaskStatus={changeTaskStatus}
                                 changeTaskTitle={changeTaskTitle}/>
                })}
            </div>

            <div className={s.filterButtons}>
                <Button variant={props.todolist.filter === 'all' ? 'contained' : 'text'} onClick={onClickAllHandler}

                >All
                </Button>
                <Button
                    variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                    onClick={onClickActiveHandler}

                >Active
                </Button>

                <Button
                    variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onClickCompletedHandler}
                >Completed
                </Button>

            </div>
        </div>
    )
})


export default TodoList;