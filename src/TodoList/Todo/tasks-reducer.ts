import {TasksStateType} from '../../App';
import {AddTodoActionType, ClearTodosACType, RemoveTodoActionType, SetTodoACType} from './todolist-reducer';
import {
    TaskPriorities,
    TaskStatusType,
    TaskType,
    todoListsAPI,
    TodoListType,
    UpdateTaskModelType
} from '../../api/todolistsAPI';
import {Dispatch} from 'redux';
import {AppActionTypes, AppRootStateType, AppThunk} from '../../store';
import {SetErrorAC, SetErrorACType, SetStatusAC} from '../../AppWithRedux/app.reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/ErrorUtils';

export type Action1Type = {
    type: 'REMOVE-TASK'
    todoListId: string
    id: string

}
export type Action2Type = {
    type: 'ADD-TASK'
    newTask: TaskType
    todoListId: string
}
export type Action4Type = {
    type: 'UPDATE-TASK'
    todoListId: string
    id: string
    model: TaskType
}
export type Action5Type = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todoListId: string
}
export type Action6Type = {
    type: 'CLEAR-TASKS'
}

export type TaskActionTypes = Action1Type | Action2Type |
    Action4Type | AddTodoActionType | RemoveTodoActionType |
    SetTodoACType | Action5Type | Action6Type


const initialState: TasksStateType =
    {
        // [todoListId1]: [
        //     {
        //         id: v1(), title: 'HTML', status: TaskStatusType.Completed, todoListId: todoListId1,
        //         startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
        //         deadline: '' +
        //             '', description: ''
        //     },
        //     {
        //         id: v1(), title: 'CSS', status: TaskStatusType.Completed, todoListId: todoListId1,
        //         startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
        //         deadline: '' +
        //             '', description: ''
        //     },
        //     {
        //         id: v1(), title: 'REACT/REDUX', status: TaskStatusType.InProgress, todoListId: todoListId1,
        //         startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
        //         deadline: '' +
        //             '', description: ''
        //     }
        // ],
        // [todoListId2]: [
        //     {
        //         id: v1(), title: 'Bread', status: TaskStatusType.Completed, todoListId: todoListId1,
        //         startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
        //         deadline: '' +
        //             '', description: ''
        //     },
        //     {
        //         id: v1(), title: 'Milk', status: TaskStatusType.InProgress, todoListId: todoListId1,
        //         startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
        //         deadline: '' +
        //             '', description: ''
        //     },
        //
        // ]
    }


export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionTypes | SetErrorACType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todoListId]:
                    state[action.todoListId].filter(t => t.id !== action.id)
            }
        case 'ADD-TASK':
            return {...state, [action.todoListId]: [...state[action.todoListId], action.newTask]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todoListId]: [...state[action.todoListId].map(task => task.id === action.id ? {
                    ...action.model
                } : task)]
            }
        case'ADD-TODO': {
            return {...state, [action.todoList.id]: []}
        }
        case'REMOVE-TODO': {
            const copy = {...state}
            delete copy[action.id]
            return copy
        }
        case 'SET-TODO': {
            const copy = {...state}
            action.todo.forEach((tl: TodoListType) => {
                return copy [tl.id] = []
            })
            return copy
        }
        case 'SET-TASKS': {
            return {...state, [action.todoListId]: action.tasks}
        }
        case 'CLEAR-TASKS': {
            return {}
        }
        default:
            return state

    }
}


export const removeTaskAC = (id: string, todoListId: string): Action1Type => {
    return {type: 'REMOVE-TASK', todoListId: todoListId, id: id,} as const
}


export const addTaskAC = (newTask: TaskType): Action2Type => {
    if (newTask && newTask.todoListId) {
        return {type: 'ADD-TASK', todoListId: newTask.todoListId, newTask: newTask} as const;
    }
    throw new Error('Invalid task object');
};

export const updateTaskAC = (todoListId: string, id: string, model: TaskType): any => {
    return {type: 'UPDATE-TASK', todoListId: todoListId, id: id, model: model} as const
}

export const setTasksAC = (todoListId: string, tasks: TaskType[]): Action5Type => {
    return {type: 'SET-TASKS', todoListId: todoListId, tasks: tasks} as const
}
export const clearTasksAC = (): Action6Type => {
    return {type: 'CLEAR-TASKS',}
}

export const fetchTasksTC = (todoListId: string): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    todoListsAPI.getTasks(todoListId).then(res => {
        dispatch(setTasksAC(todoListId, res.data.items));
        dispatch(SetStatusAC('succeeded'))
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })

};

export const addTaskTC = (newTask: TaskType, todoListId: string): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    todoListsAPI.postTask(todoListId, newTask.title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item));
            dispatch(SetStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)

        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
};

export const deleteTaskTC = (id: string, todoListId: string): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    todoListsAPI.deleteTask(todoListId, id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(id, todoListId));
                dispatch(SetStatusAC('succeeded'))
            } else{
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatusType
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (id: string, todoListId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    (dispatch: Dispatch<AppActionTypes>, getState: () => AppRootStateType) => {
        dispatch(SetStatusAC('loading'))
        const state = getState()
        const task = state.tasks[todoListId].find(task => task.id === id)
        if (!task) {
            console.warn('task not found')
            return
        }
        const updatedTask: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todoListsAPI.putTask(todoListId, id, updatedTask)
            .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todoListId, id, res.data.data.item));
                dispatch(SetStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
            .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    };



