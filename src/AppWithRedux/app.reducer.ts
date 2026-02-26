import {AppThunk} from '../store';
import {authAPI} from '../api/todolistsAPI';
import {logInAC} from '../Features/Login/login-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/ErrorUtils';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState

export type AppActionsType = SetErrorACType | SetStatusACType | SetInitializedACType


export type SetErrorACType = ReturnType<typeof SetErrorAC>
export type SetStatusACType = ReturnType<typeof SetStatusAC>
export type SetInitializedACType = ReturnType<typeof SetAppInitializedAC>


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-STATUS':
            return {...state, status: action.status}
        case 'app/SET-ERROR':
            return {...state, error: action.error}
        case 'app/IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}


export const SetStatusAC = (status: RequestStatusType) => ({type: 'app/SET-STATUS', status: status} as const)
export const SetErrorAC = (error: string | null) => ({type: 'app/SET-ERROR', error: error} as const)
export const SetAppInitializedAC = (isInitialized: boolean) => ({
    type: 'app/IS-INITIALIZED',
    isInitialized: isInitialized
} as const)


export const SetIsInitializedTC = (): AppThunk => (dispatch) => {
    return authAPI.isAuth()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(logInAC(true))

            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(SetAppInitializedAC(true))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}