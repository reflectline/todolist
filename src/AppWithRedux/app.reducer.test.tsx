import {appReducer, RequestStatusType, SetErrorAC, SetStatusAC} from './app.reducer';

const startState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}
describe('myau', () => {

    test('Correct error message should be set', () => {

        const endState = appReducer(startState, SetErrorAC('some error'))
        expect(endState.error).toBe('some error');

    });


    test('Correct error message should be set', () => {

        const endState = appReducer(startState, SetStatusAC('loading'))
        expect(endState.status).toBe('loading');

    });
})
