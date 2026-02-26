import {Meta} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';
import {TaskPriorities, TaskStatusType} from '../../../api/todolistsAPI';

const meta: Meta = {
    title: 'Task Component',
    component: Task
}
export default meta

const taskTitleChanged = action('task title was changed')
const taskStatusChanged = action('task status was changed')
const taskWasRemoved = action('task  was removed')

export const TaskExample = () => {
    return (
        <><Task task={{
            id: '1', status: TaskStatusType.Completed, title: 'Task Title', todoListId: 'todoListId1',
            startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
            deadline: '' +
                '', description: ''
        }} todoListId="todolistId1"
                changeTaskTitle={taskTitleChanged}
                changeTaskStatus={taskStatusChanged}
                removeTask={taskWasRemoved}
        />
            <Task task={{
                id: '1', status: TaskStatusType.Completed, title: 'Task2 Title',
                todoListId: 'todolistId2',
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            }} todoListId="todolistId2"
                  changeTaskTitle={taskTitleChanged}
                  changeTaskStatus={taskStatusChanged}
                  removeTask={taskWasRemoved}
            />
        </>
    )
}
