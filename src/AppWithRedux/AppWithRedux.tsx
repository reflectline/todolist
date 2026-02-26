import React, {useEffect} from 'react';
import s from '../App.module.css';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import {TaskType} from '../api/todolistsAPI';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, ThunkDispatchType} from '../store';
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType, SetIsInitializedTC} from './app.reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../Features/Login/Login';
import {Box, CircularProgress} from '@mui/material';
import {TodoListsWrap} from '../TodoList/TodolistsWrap';
import {logOutTC} from '../Features/Login/login-reducer';
import pageNotFoundPhoto from '../assets/images/400.svg';


export type TasksStateType = {
    [key: string]: TaskType[]
}
type PropsType = {
    demo: boolean
}

function AppWithRedux({demo}: PropsType) {

    const dispatch: ThunkDispatchType = useDispatch();
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isAuth = useSelector<AppRootStateType>(state => state.logIn.isAuth)

    useEffect(() => {
        dispatch(SetIsInitializedTC())
    }, [])

    if (!isInitialized) {
        return <Box
            sx={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <CircularProgress />
        </Box>
    }

    return (

        <div className={s.App}>
            <ErrorSnackbar/>
            <AppBar position="static">

                <Toolbar>
                    <>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        {isAuth &&
                            <Button variant="outlined" onClick={() => dispatch(logOutTC())} color="inherit">Log
                                out</Button>}
                    </>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>

                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404"
                           element={
                                    <div className={s.pageNotFound}>
                                        <img src={pageNotFoundPhoto} alt='pageNotFoundPhoto'/>
                                        PAGE NOT FOUND
                                    </div>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                    <Route path="/login" element={<Login/>}/>

                    <Route path="/todolist" element={
                        <TodoListsWrap demo={demo}/>
                    }/>
                </Routes>

            </Container>
        </div>

    );
}


export default AppWithRedux;
