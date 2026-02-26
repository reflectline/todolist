import {TasksStateType} from '../App';
import {tasksReducer} from '../TodoList/Todo/tasks-reducer';
import {addTodoAC, TodolistDomainType, todoListReducer} from '../TodoList/Todo/todolist-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: TodolistDomainType[]= [];

    const action = addTodoAC({id: 'todoListId3', title: 'aaaaaa',addedDate: '', order: 0});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe('todoListId3');
    expect(idFromTodoLists).toBe('todoListId3');
});