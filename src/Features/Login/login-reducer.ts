import {AppThunk} from '../../store';
import {authAPI, loginParamsType} from '../../api/todolistsAPI';
import {SetStatusAC} from '../../AppWithRedux/app.reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/ErrorUtils';
import {clearTasksAC} from '../../TodoList/Todo/tasks-reducer';
import {clearTodosAC} from '../../TodoList/Todo/todolist-reducer';


const initialState: loginParamsType = {
    email: '',
    password: '',
    rememberMe: false,
    captcha: '',
    isAuth: false
}

type LogInACType = {
    type: 'login/LOG-IN',
    isAuth: boolean
}
type LogOutACType = {
    type: 'login/LOG-OUT',
    isAuth: boolean
}


export type LogInActionTypes = LogInACType | LogOutACType

export const loginReducer = (state: loginParamsType = initialState, action: LogInActionTypes): loginParamsType => {

    switch (action.type) {
        case 'login/LOG-IN':
            return {
                ...state, isAuth: action.isAuth,
            }
        case 'login/LOG-OUT':
            return {
                ...state, isAuth: action.isAuth,
            }
        default:
            return state

    }
}


export const logInAC = (isAuth: boolean): LogInACType => {
    return {type: 'login/LOG-IN', isAuth: isAuth} as const
}

export const logOutAC = (isAuth: boolean): LogOutACType => {
    return {type: 'login/LOG-OUT', isAuth: isAuth} as const
}

export const logInTC = (params: loginParamsType): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    return authAPI.logIn(params)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(SetStatusAC('succeeded'))
                dispatch(logInAC(true))
                console.log('Login Successful')
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(SetStatusAC('failed'))
            handleServerNetworkError(error, dispatch)
        })
}
export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    return authAPI.logOut()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(SetStatusAC('succeeded'))
                dispatch(logOutAC(false))
                dispatch(clearTodosAC())
                dispatch(clearTasksAC())

            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(SetStatusAC('failed'))
            handleServerNetworkError(error, dispatch)
        })
}




