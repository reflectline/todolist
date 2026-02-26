import {ChangeEvent, useEffect, useState} from 'react';
import {todoListsAPI, TodoListType, UpdateTaskModelType} from './todolistsAPI';
import {Meta} from '@storybook/react';

export default {
    title: 'Get-Post-Delete-Put-Requests',
} as Meta;


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6d618c5c-24f1-48e7-9694-a9a2e7863199'
    }
}


export const GetTodoLists = () => {
    const [state, setState] = useState<TodoListType[]>()
    useEffect(() => {
        todoListsAPI.getTodoLists().then((res) => {
            return setState(res.data);
        })
    }, [])
    return <div>
        {JSON.stringify(state)}
    </div>
}
export const PostTodoLists = () => {
    const [state, setState] = useState<{}>()
    const [title, setTodolistTitle] = useState<string>('')

    function handler() {
        todoListsAPI.postTodoList(title)
            .then((res) => {
                setState(res.data.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTodolistTitle(e.currentTarget.value)
            }}/>
            <button onClick={handler}>add TodoList</button>
        </div>)
}


export const PutTodoList = () => {
    const [state, setState] = useState<any>()
    const [title, setTodolistTitle] = useState<string>('')
    const [todoListId, setTodolistId] = useState<string>('')

    function handler() {
        todoListsAPI.putTodoList(todoListId,title )
            .then((res) => {
                setState(res.data.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input value={title} onChange={(e) => {
                setTodolistTitle(e.currentTarget.value)
            }} placeholder={'enter title'}/>
            <input value={todoListId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} placeholder={'enter id'}/>
            <button onClick={handler}>add TodoList</button>
        </div>)
}

export const DeleteTodoLists = () => {
    const [state, setState] = useState<any>()
    const [todoListId, setTodolistId] = useState<string>('')

    function handler() {
        todoListsAPI.deleteTodoList(todoListId)
            .then((res:any) => {
                setState(res.data.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input value={todoListId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={handler}>Delete TodoList</button>
        </div>)
}


export const GetTasks = () => {
    const [state, setState] = useState<any>()
    const [todoListId, setTodoListId] = useState<string>('')


    function onClickHandler() {
        todoListsAPI.getTasks(todoListId).then((res: any) => {
            setState(res.data.items)
        })
    }

    return (
        <div>
            <input value={todoListId} onChange={(e) => {
                setTodoListId(e.currentTarget.value)
            }} placeholder={'enter id'}/>
            <button onClick={onClickHandler}>Show tasks</button>
            {JSON.stringify(state)}
        </div>)
}


export const PostTasks = () => {
    const [state, setState] = useState<any>()
    const [todoListId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [completed, setCompleted] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [priority, setPriority] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    function onClickHandler() {
        todoListsAPI.postTask(todoListId, title)
            .then((res) => {
                setState(res.data.data.item)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input value={todoListId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} placeholder={'enter todoListId'}/>
            <input value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }} placeholder={'enter title'}/>

            <button onClick={onClickHandler}>Add Task</button>
        </div>)
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>()
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodolistId] = useState<string>('')

    function onClickHandler() {
        todoListsAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input value={todoListId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={onClickHandler}>Delete Task</button>
        </div>)
}

export const PutTasks = () => {
    const [title, setTitle] = useState<string>('')
    const [state, setState] = useState<any>()
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodolistId] = useState<string>('')
    const updatedTask: UpdateTaskModelType = {
        title: title,
        description: '',
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
    }
    function onClickHandler() {
        todoListsAPI.putTask(todoListId, taskId, updatedTask)
            .then((res) => {
                setState(res.data.data.item)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input value={todoListId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}
                   placeholder={'TodolistId'}/>
            <input value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}
                   placeholder={'TaskId'}/>
            <input value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}
                   placeholder={'Title'}/>
            <button onClick={onClickHandler}>Update Task</button>
        </div>)
}