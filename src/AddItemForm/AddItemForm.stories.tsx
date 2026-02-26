import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';
import {Meta} from '@storybook/react';

const meta: Meta<typeof AddItemForm> = {
    title: 'AddItemForm Component',
    component: AddItemForm
}

export default meta;

const callback = action('Button was pressed inside the form')

export const AddItemFormExample = () => {
    return <AddItemForm addItem={callback} />
}
export const AddItemFormDisabledExample = () => {
    return <AddItemForm addItem={callback} disabled={true}/>
}