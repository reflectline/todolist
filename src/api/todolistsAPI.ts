import axios from 'axios';


export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}


export type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'f701cf40-f047-443a-8f3a-da7aadd3e8cb'
    }
}


export type TaskResponseType<D = {}> = {
    items: TaskType[];
    item: D
    totalCount: number
    error: string | null
}

export enum TaskStatusType {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatusType
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: Date | string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatusType
    priority: TaskPriorities
    startDate: string
    deadline: string
}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    ...settings
})

export const todoListsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>(`todo-lists`)
    },

    postTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {title: title})
    },

    putTodoList(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`,
        )
    },

    getTasks(todolistId: string) {
        return instance.get<TaskResponseType<TaskType[]>>(`todo-lists/${todolistId}/tasks`)
    },
    postTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    putTask(todolistId: string, taskId: string, updatedTask: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, updatedTask)
    },
}


export type loginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
    isAuth?: boolean
}

export const authAPI = {
    isAuth() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('/auth/me')
    },
    logIn(params: loginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>(`/auth/login`, params)
    },
    logOut() {
        return instance.delete<ResponseType<{ userId?: number }>>(`/auth/login`)
    },
}

