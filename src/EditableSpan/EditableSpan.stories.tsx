import {Meta} from '@storybook/react';
import {EditableSpan} from './EditableSpan';
import {action} from '@storybook/addon-actions';

const meta: Meta = {
    title: 'Editable span Component',
    component: EditableSpan
}
export default meta

const TitleChanged = action('title was changed')


export const TaskExample = () => {
    return (
        <>
            <EditableSpan title={'title'} onChangeTitleHandler={TitleChanged}/>
        </>
    )
}
