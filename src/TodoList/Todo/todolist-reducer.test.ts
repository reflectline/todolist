import {v1} from 'uuid';
import {
    addTodoAC,
    changeTodoEntityStatusAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    removeTodoAC,
    setTodoAC,
    TodolistDomainType,
    todoListReducer
} from './todolist-reducer';


const todoListId1 = v1()
const todoListId2 = v1()
const startState: TodolistDomainType[] = [
    {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'}
]

describe('Todo list reducer tests', () => {
    test('Todo list should be deleted', () => {

        const newState = todoListReducer(startState, removeTodoAC(todoListId2))
        expect(newState?.length).toBe(1)
    })
    test('New Todo list should be added', () => {


        const newState = todoListReducer(startState, addTodoAC({
            id: 'todoListId3',
            title: 'aaaaaa',
            addedDate: '',
            order: 0
        },))
        expect(newState?.length).toBe(3)
        expect(newState[2]?.filter).toBe('all')
        expect(newState[0]?.title).toBe('aaaaaa')

    })
    test('Todo list title should be changed', () => {


        let action = {
            id: todoListId2,
            newTitle: 'New Title'
        }

        const newState = todoListReducer(startState, changeTodoTitleAC(action.id, action.newTitle))
        expect(newState.length).toBe(2)
        expect(newState[1]?.title).toBe('New Title')

    })
    test('Todo list filter should be changed', () => {


        const newState = todoListReducer(startState, changeTodoFilterAC(todoListId2, 'active'))
        expect(newState.length).toBe(2)
        expect(newState[1]?.filter).toBe('active')

    })
    test('Todo list should be set', () => {
        let newState = todoListReducer([], setTodoAC(startState))
        expect(newState.length).toBe(2)
    })
    test('Todo list should be disabled when the status is "loading"', () => {
        let newState = todoListReducer(startState, changeTodoEntityStatusAC(todoListId2, 'loading'))
        expect(newState.length).toBe(2)
    })
})