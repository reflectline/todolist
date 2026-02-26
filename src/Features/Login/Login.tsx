import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {logInTC} from './login-reducer';
import {AppRootStateType, ThunkDispatchType} from '../../store';
import {Navigate} from 'react-router-dom';
import s from './Login.module.css'


export const Login = () => {

    //настройка функции 'показать пароль'
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };


// работа с формой
    const dispatch: ThunkDispatchType = useDispatch()
    const isAuth = useSelector<AppRootStateType>(state => state.logIn.isAuth)


    const formik = useFormik({
        initialValues: {
            email: 'free@samuraijs.com',
            password: 'free',
            rememberMe: false
        },
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                };
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                return {
                    email: 'Invalid email address'
                };
            } else if (!values.password) {
                return {
                    password: 'Password is required'
                };
            } else if (values.password.length < 4) {
                return {
                    password: "Password must contain at least 4 characters"
                };
            } else {
                return {};
            }
        },
        onSubmit: (values) => {
            dispatch(logInTC(values));
        }
    });

    if (isAuth) {
        return <Navigate to={'/todolist'}/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" defaultValue={'free@samuraijs.com'}
                                   {...formik.getFieldProps('email')}/>
                        {formik.errors.email ? <div className={s.error}>{formik.errors.email}</div> : null}
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            margin="normal" defaultValue={'free'}
                            {...formik.getFieldProps('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        /> {formik.errors.password ? <div className={s.error}>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'} control={<Checkbox/>}
                                          {...formik.getFieldProps('rememberMe')}
                                          checked={formik.values.rememberMe}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}



