import * as React from "react";
import {useRef, useState} from 'react';
import {NavigateFunction, useNavigate} from "react-router-dom";
import {IncomingDataTypes, OutgoingDataTypes,} from "../types";
import {useDispatch} from "react-redux";
import {updateAllPosts, updateAllUsers, updateUser} from "../../features/states";
import {apiService} from "../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import config from "../../config";

const LoginPage = () => {
    const nav: NavigateFunction = useNavigate()
    const dispatch = useDispatch()
    const usernameRef:React.MutableRefObject<HTMLInputElement>= useRef()
    const passwordRef:React.MutableRefObject<HTMLInputElement>= useRef()
    const [autoLogin, setAutoLogin] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    async function login (): Promise<void> {
        const username: string = usernameRef.current.value
        const password: string = passwordRef.current.value
        if (username === '') return setError('Please enter username')
        if (password === '') return setError('Please enter password')
        const user: OutgoingDataTypes.LoginAndRegData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        const data: IncomingDataTypes.LoginData = await apiService.login(user)
        if (!data.error){
            nav('/profile')
            config.token = data.data.token
            dispatch(updateUser(data.data.user))
            dispatch(updateAllPosts(data.data.allPosts))
            dispatch(updateAllUsers(data.data.allUsers))
            if (autoLogin){
                localStorage.setItem('token', data.data.token)
            }else{
                sessionStorage.setItem('token', data.data.token)
            }
        }else{
            setError(data.message)
        }
    }
    return (
        <div className='p-3'>
            <div className='d-flex'>
                <div className='default-button' onClick={() => nav('/')}>Register</div>
            </div>
            <div className='d-flex flex-column gap-2 p-5'>
                <input type="text" placeholder='Username' ref={usernameRef}/>
                <input type="text" placeholder='Password' ref={passwordRef}/>
                <div className='auto-login'>
                    <input type="checkbox" onChange={() => setAutoLogin(!autoLogin)}/> Keep me logged in
                </div>
                <div className='default-button' onClick={login}>Login</div>
                <div style={{color: 'red'}}><b>{error}</b></div>
            </div>
        </div>
    );
};

export default LoginPage;