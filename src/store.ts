import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TaskActionTypes, tasksReducer} from './TodoList/Todo/tasks-reducer';
import {todoListReducer, TodoListsActionTypes} from './TodoList/Todo/todolist-reducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionsType, appReducer} from './AppWithRedux/app.reducer';
import {LogInActionTypes, loginReducer} from './Features/Login/login-reducer';


export type AppRootStateType = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    logIn: loginReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppActionTypes = TodoListsActionTypes | TaskActionTypes | AppActionsType | LogInActionTypes

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    AppActionTypes>
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, void, AppActionTypes>;
// @ts-ignore
window.store = store