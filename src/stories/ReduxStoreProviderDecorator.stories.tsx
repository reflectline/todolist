import {Provider} from 'react-redux';
import {Meta} from '@storybook/react';
import AppWithRedux from '../AppWithRedux/AppWithRedux';
import {ReactNode} from 'react';
import {v1} from 'uuid';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../TodoList/Todo/tasks-reducer';
import {todoListReducer} from '../TodoList/Todo/todolist-reducer';
import {TaskPriorities, TaskStatusType} from '../api/todolistsAPI';
import {appReducer} from '../AppWithRedux/app.reducer';
import thunkMiddleware from 'redux-thunk';


const meta: Meta = {
    title: 'AppWithRedux span Component',
    component: AppWithRedux,
}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer
})


export type AppRootStateType = ReturnType<typeof rootReducer>;

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML', status: TaskStatusType.Completed, todoListId: 'todolistId1',
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '', description: ''
            },
            {
                id: v1(), title: 'JS', status: TaskStatusType.Completed, todoListId: 'todolistId1',
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '', description: ''
            },
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatusType.InProgress, todoListId: 'todolistId2',
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '', description: ''
            },
            {
                id: v1(), title: 'React Book', status: TaskStatusType.Completed, todoListId: 'todolistId2',
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '', description: ''
            },
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunkMiddleware),);


export default meta

export const ReduxStoreProviderDecoratorStories = (storyFn: () => ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}


