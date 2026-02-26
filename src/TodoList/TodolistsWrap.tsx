import {useAppWithRedux} from '../AppWithRedux/hooks/useAppWithRedux';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TodoList from './Todo/TodoList';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, ThunkDispatchType} from '../store';
import {fetchTodoListsTC} from './Todo/todolist-reducer';
import {Navigate} from 'react-router-dom';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {RequestStatusType} from '../AppWithRedux/app.reducer';

type PropsType = {
    demo: boolean
}

export const TodoListsWrap = ({demo}: PropsType) => {
    const {
        addTodoList,
        todoLists,
        changeFilter,
        removeTodoList,
        changeTodoListTitle
    } = useAppWithRedux()
    const dispatch: ThunkDispatchType = useDispatch();


    const isAuth = useSelector<AppRootStateType>(state => state.logIn.isAuth)

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTodoListsTC())
    }, [dispatch])


    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodoList} disabled={status === 'loading'}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map((tl) => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: '15px'}}>
                                <TodoList
                                    todolist={tl}
                                    changeFilter={changeFilter}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}