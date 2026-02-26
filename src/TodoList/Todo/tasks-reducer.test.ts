import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC} from './tasks-reducer';
import {addTodoAC, removeTodoAC, setTodoAC, todoListId1, todoListId2} from './todolist-reducer';
import {TaskPriorities, TaskStatusType, TaskType} from '../../api/todolistsAPI';
import {TasksStateType} from '../../App';


const startState: TasksStateType = {
    ['todoListId1']: [
        {
            id: '1', title: 'HTML', status: TaskStatusType.Completed, todoListId: 'todoListId1',
            startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
            deadline: '' +
                '', description: ''
        },
        {
            id: '2', title: 'CSS', status: TaskStatusType.Completed, todoListId: 'todoListId1',
            startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
            deadline: '' +
                '', description: ''
        },
        {
            id: '3', title: 'REACT/REDUX', status: TaskStatusType.InProgress, todoListId: 'todoListId1',
            startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
            deadline: '' +
                '', description: ''
        }
    ],
    ['todoListId2']: [
        {
            id: '1', title: 'Bread', status: TaskStatusType.Completed, todoListId: 'todoListId1',
            startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
            deadline: '' +
                '', description: ''
        },
        {
            id: '2', title: 'Milk', status: TaskStatusType.InProgress, todoListId: 'todoListId1',
            startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
            deadline: '' +
                '', description: ''
        },

    ]
}
describe('task reducer tests', () => {
    test('Task should be deleted', () => {

        const endState = tasksReducer(startState, removeTaskAC('2', 'todoListId2'))

        expect(endState['todoListId1'].length).toBe(3);
        expect(endState['todoListId2'].length).toBe(1);
        expect(endState['todoListId2'].every((t: { id: string; }) => t.id !== '2')).toBeTruthy();
    });
    test('Task should be added', () => {
        const newTask: TaskType = {
            id: '4', title: 'aaa', status: TaskStatusType.New, todoListId: 'todoListId1',
            startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
            deadline: '' +
                '', description: ''
        };
        const endState = tasksReducer(startState, addTaskAC(newTask))
        expect(endState['todoListId1'].length).toBe(4);
        expect(endState['todoListId2'].length).toBe(2);
        expect(endState['todoListId1'][3]).toEqual({
            id: '4', title: 'aaa', status: TaskStatusType.New, todoListId: 'todoListId1',
            startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
            deadline: '' +
                '', description: ''
        });

    })
    test('Task status should be changed', () => {
        const Task: TaskType = {
            id: 'todoListId1',
            startDate: '',
            addedDate: '',
            order: 0,
            priority: 0,
            deadline: '',
            description: '',
            todoListId: '3',
            title: '',
            status: TaskStatusType.Completed
        }
        const endState = tasksReducer(startState, updateTaskAC('todoListId1', '3', Task))
        expect(endState['todoListId1'].length).toBe(3);
        expect(endState['todoListId2'].length).toBe(2);
        expect(endState['todoListId1'][2].status).toBe(TaskStatusType.Completed);
    })


    test('Task title should be changed', () => {
        const Task: TaskType = {
            id: 'todoListId1',
            startDate: '',
            addedDate: '',
            order: 0,
            priority: 0,
            deadline: '',
            description: '',
            todoListId: '3',
            title: 'new Title',
            status: 0
        }
        const endState = tasksReducer(startState, updateTaskAC('todoListId1', '3', Task))
        expect(endState['todoListId1'].length).toBe(3);
        expect(endState['todoListId2'].length).toBe(2);
        expect(endState['todoListId1'][2].title).toBe('new Title');
    })

    test('new property with new array should be added when new todolist is added', () => {

        const action = addTodoAC({id: 'todolistId', title: 'shdip shdip', addedDate: '', order: 0})
        const endState = tasksReducer(startState, action)

        const keys = Object.keys(endState)
        const newKey = keys.find(k => k != 'todoListId1' && k != 'todoListId2')
        if (!newKey) {
            throw Error('new key should be added')
        }

        expect(keys.length).toBe(3)
        expect(endState[newKey]).toStrictEqual([])
    })


    test('property with todoListId should be deleted', () => {
        const action = removeTodoAC('todoListId2');
        const endState = tasksReducer(startState, action)
        const keys = Object.keys(endState);
        expect(keys.length).toBe(1);
        expect(endState['todoListId2']).not.toBeDefined();
    });
    test('empty array should be added when todolist was set ', () => {
        const action = setTodoAC([
            {id: todoListId1, title: 'What to learn', addedDate: '', order: 0},
            {id: todoListId2, title: 'What to buy', addedDate: '', order: 0}
        ]);
        const endState = tasksReducer({}, action)
        const keys = Object.keys(endState)

        expect(keys[0]).toBe(todoListId1);
        expect(keys[1]).toBe(todoListId2);
        expect(endState[todoListId1]).toEqual([]);
    });
    test('task should be added to todoListId', () => {
        const action = setTasksAC('todoListId1', startState['todoListId1']);
        const endState = tasksReducer({
            ['todoListId1']: [],
            ['todoListId2']: []
        }, action)
        const keys = Object.keys(endState)

        expect(keys[0]).toBe('todoListId1');
        expect(endState['todoListId1'].length).toBe(3);
        expect(endState['todoListId2'].length).toBe(0);
    });
})