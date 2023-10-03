import * as React from "react";
import {useRef, useState} from 'react';
import {NavigateFunction, useNavigate} from "react-router-dom";
import config from "../config";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AxiosResponses} from "../types";
import {useDispatch} from "react-redux";
import {updateUser} from "../../features/users";
import axios, {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";

type LoginData = {
    username: string,
    password: string
}

const LoginPage = () => {
    const serverRoute: string = config.serverRoute
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
        const user: LoginData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        const options: AxiosRequestConfig = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const response: AxiosResponse = await axios.post(`${serverRoute}/login`, user, options)
        const data: AxiosResponses.LoginData = response.data
        if (!data.error){
            nav('/profile')
            dispatch(updateUser(data.data.user))
            if (autoLogin){
                localStorage.setItem('token', data.data.token)
            }else{
                sessionStorage.setItem('token', data.data.token)
            }
            config.token = localStorage.getItem('token') || sessionStorage.getItem('token')
        }else{
            setError(data.message)
        }
    }
    return (
        <div className='p-3'>
            <div>
                <button className='btn btn-secondary' onClick={() => nav('/')}>Register</button>
            </div>
            <div className='d-flex flex-column gap-2 p-5'>
                <input type="text" placeholder='Username' ref={usernameRef}/>
                <input type="text" placeholder='Password' ref={passwordRef}/>
                <div>
                    <input type="checkbox" onChange={() => setAutoLogin(!autoLogin)}/> Keep me logged in
                </div>
                <button className='btn btn-primary' onClick={login}>Login</button>
                <div style={{color: 'red'}}><b>{error}</b></div>
            </div>
        </div>
    );
};

export default LoginPage;