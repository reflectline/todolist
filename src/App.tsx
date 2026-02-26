import React, {useState} from 'react';
import s from './App.module.css';
import TodoList from './TodoList/Todo/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm/AddItemForm';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import {FilterValueType, TodolistDomainType} from './TodoList/Todo/todolist-reducer';
import {TaskPriorities, TaskStatusType, TaskType} from './api/todolistsAPI';
import {BrowserRouter, Route} from 'react-router-dom';
import {Login} from './Features/Login/Login';


export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {


    const todoListId1 = v1()
    const todoListId2 = v1()


    const [todoLists, setTodoList] = useState<TodolistDomainType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'}
    ])

    const [tasksObj, setTasksObj] = useState<TasksStateType>(
        {
            [todoListId1]: [
                {
                    id: v1(), title: 'HTML', status: TaskStatusType.Completed, todoListId: todoListId1,
                    startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                    deadline: '' +
                        '', description: ''
                },
                {
                    id: v1(), title: 'CSS', status: TaskStatusType.Completed, todoListId: todoListId1,
                    startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                    deadline: '' +
                        '', description: ''
                },
                {
                    id: v1(), title: 'REACT/REDUX', status: TaskStatusType.InProgress, todoListId: todoListId1,
                    startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                    deadline: '' +
                        '', description: ''
                }
            ],
            [todoListId2]: [
                {
                    id: v1(), title: 'Bread', status: TaskStatusType.Completed, todoListId: todoListId1,
                    startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                    deadline: '' +
                        '', description: ''
                },
                {
                    id: v1(), title: 'Milk', status: TaskStatusType.InProgress, todoListId: todoListId1,
                    startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                    deadline: '' +
                        '', description: ''
                },

            ]
        }
    )

    // Work With Tasks
    function removeTask(id: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        tasksObj[todoListId] = tasks.filter(t => t.id !== id)

        setTasksObj({...tasksObj});
    }


    function addTasks(todoListId: string, title: string) {

        const newTask: TaskType = {
            id: v1(), title: title, status: TaskStatusType.New, todoListId: todoListId,
            startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
            deadline: '' +
                '', description: ''
        };
        let tasks = tasksObj[todoListId]

        let newTasks = [...tasks, newTask]

        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj})
    }


    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const task = tasks.find(t => t.id === taskId)

        if (task) task.status = TaskStatusType.Completed
        setTasksObj({...tasksObj})

    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const task = tasks.find(t => t.id === taskId)

        if (task) task.title = newTitle
        setTasksObj({...tasksObj})
    }


    // Work with TodoLists
    const removeTodoList = (todoListId: string) => {
        setTodoList(todoLists.filter(tl => tl.id !== todoListId))
        setTasksObj({...tasksObj})

    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
        }
        setTodoList([...todoLists])

    }

    function changeFilter(value: FilterValueType, todoListId: string) {

        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }


    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodolistDomainType = {
            id: newTodoListId,
            title: title,
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        }
        setTodoList([...todoLists, newTodoList])
        setTasksObj(prev => ({...prev, [newTodoListId]: []}))
    }

    return (

            <div className={s.App}>
                <AppBar position="static">
                    <Toolbar>
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
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                    <Grid container spacing={3}>

                        {todoLists.map((tl) => {
                            return (
                                <Grid item>
                                    <Paper style={{padding: '15px'}}>
                                        <TodoList demo={false}
                                                  todolist={tl}
                                                  key={tl.id}
                                                  changeFilter={changeFilter}
                                                  removeTodoList={removeTodoList}
                                                  changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>)
                        })}
                    </Grid>
                </Container>
            </div>

    );
}

export default App;
