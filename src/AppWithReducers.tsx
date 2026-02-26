//@ts-ignore
const a
// import React, {useReducer} from 'react';
// import s from './App.module.css';
// import TodoList, {TaskType} from './TodoList/TodoList';
// import {v1} from 'uuid';
// import {AddItemForm} from './AddItemForm/AddItemForm';
// import Typography from '@mui/material/Typography';
// import Toolbar from '@mui/material/Toolbar';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import AppBar from '@mui/material/AppBar';
// import MenuIcon from '@mui/icons-material/Menu';
// import {
//     addTodoAC,
//     changeTodoFilterAC,
//     changeTodoTitleAC,
//     removeTodoAC, TodolistDomainType,
//     todoListReducer
// } from './TodoList/todolist-reducer';
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './TodoList/tasks-reducer';
//
//
// function AppWithReducers() {
//
//
//     const todoListId1 = v1()
//     const todoListId2 = v1()
//
//
//
//     const [todoLists, dispatchToTodolistReducer] = useReducer<TodolistDomainType>(todoListReducer, [
//         {id: todoListId1, title: 'What to learn', filter: 'all'},
//         {id: todoListId2, title: 'What to buy', filter: 'all'}
//     ])
//
//     const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,
//         {
//             [todoListId1]: [
//                 {id: v1(), title: 'HTML', isDone: true},
//                 {id: v1(), title: 'CSS', isDone: true},
//                 {id: v1(), title: 'REACT/REDUX', isDone: false}
//             ],
//             [todoListId2]: [
//                 {id: v1(), title: 'Bread', isDone: true},
//                 {id: v1(), title: 'Milk', isDone: false},
//
//             ]
//         }
//     )
//
//     // Work With Tasks
//     function removeTask(id: string, todoListId: string) {
//         dispatchToTasksReducer(removeTaskAC(id, todoListId))
//
//     }
//
//
//     function addTasks(todoListId: string, title: string) {
//
//         const newTask: TaskType = {id: v1(), title: title, isDone: false};
//         dispatchToTasksReducer(addTaskAC(newTask, todoListId))
//
//     }
//
//
//     function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
//         dispatchToTasksReducer(changeTaskStatusAC(taskId, todoListId, isDone))
//
//
//     }
//
//     function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
//         dispatchToTasksReducer(changeTaskTitleAC(taskId, todoListId, newTitle))
//
//     }
//
//
//     // Work with TodoLists
//     const removeTodoList = (todoListId: string) => {
//         dispatchToTasksReducer(removeTodoAC(todoListId))
//         dispatchToTodolistReducer(removeTodoAC(todoListId))
//
//     }
//
//     const addTodoList = (title: string) => {
//         const todoId = v1()
//         dispatchToTodolistReducer(addTodoAC(title,todoId))
//         dispatchToTasksReducer(addTodoAC(title,todoId))
//     }
//
//     const changeTodoListTitle = (id: string, newTitle: string) => {
//         dispatchToTodolistReducer(changeTodoTitleAC(id, newTitle))
//
//     }
//
//     function changeFilter(value: FilterValueType, todoListId: string) {
//         dispatchToTodolistReducer(changeTodoFilterAC(todoListId, value))
//     }
//
//     return (
//         <div className={s.App}>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{mr: 2}}
//                     >
//                         <MenuIcon/>
//                     </IconButton>
//                     <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: '20px'}}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//
//                     {todoLists.map((tl) => {
//
//                         let tasksForTodoList = tasksObj[tl.id];
//
//                         if (tl.filter === 'completed') {
//                             tasksForTodoList = tasksForTodoList?.filter(t => t.isDone)
//                         }
//                         if (tl.filter === 'active') {
//                             tasksForTodoList = tasksForTodoList?.filter(t => !t.isDone)
//                         }
//
//                         return (
//                             <Grid item>
//                                 <Paper style={{padding: '15px'}}>
//                                     <TodoList
//                                         key={tl.id}
//                                         id={tl.id}
//                                         title={tl.title}
//                                         // tasks={tasksForTodoList ? tasksForTodoList : []}
//                                         // removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         // addTasks={addTasks}
//                                         // changeStatus={changeStatus}
//                                         // changeTaskTitle={changeTaskTitle}
//                                         filter={tl.filter}
//                                         removeTodoList={removeTodoList}
//                                         changeTodoListTitle={changeTodoListTitle}
//                                     />
//                                 </Paper>
//                             </Grid>)
//                     })}
//
//
//                 </Grid>
//
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducers;
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore