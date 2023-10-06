import * as React from "react";
import {useRef, useState} from 'react';
import {NavigateFunction, useNavigate} from "react-router-dom";
import {IncomingDataTypes, OutgoingDataTypes} from "../types";
import {apiService} from "../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
    const nav: NavigateFunction = useNavigate()
    const usernameRef:React.MutableRefObject<HTMLInputElement> = useRef()
    const passwordRef:React.MutableRefObject<HTMLInputElement> = useRef()
    const passwordTwoRef:React.MutableRefObject<HTMLInputElement> = useRef()
    const [error, setError] = useState<string>('')
    async function register (): Promise<void> {
        const username: string = usernameRef.current.value
        const password: string = passwordRef.current.value
        const passwordTwo: string = passwordTwoRef.current.value
        let doesHaveCapitalLetter: boolean = false
        if (username === '') return setError('Please enter username')
        if (password === '') return setError('Please enter password')
        if (passwordTwo === '') return setError('Please repeat password')
        if (username.length < 4) return setError('Username must be longer than 4 letters')
        if (password.length < 4) return setError('Password must be longer than 4 letters')
        if (username.length > 20) return setError('Username cant be longer than 20 letters')
        if (password.length > 20) return setError('Password cant be longer than 20 letters')
        if (password !== passwordTwo) return setError('Passwords must match')
        for (let i: number = 0; i < password.length; i++) {
            const letter: string = password[i]
            if (letter === letter.toUpperCase()){
                doesHaveCapitalLetter = true
                break
            }else{
                doesHaveCapitalLetter = false
            }
        }
        if (!doesHaveCapitalLetter) return setError('Password must have at least one capital letter')
        const user: OutgoingDataTypes.LoginAndRegData = {
            username,
            password,
        }
        const data: IncomingDataTypes.DefaultResponse = await apiService.register(user)
        if (!data.error) nav('/login')
        else setError(data.message)
    }

    return (
        <div className='p-3'>
            <div className='d-flex'>
                <div className='default-button' onClick={() => nav('/login')}>Login</div>
            </div>
            <div className='p-5'>
                <div className='d-flex flex-column gap-2 mt-3'>
                    <input type="text" placeholder='Username' ref={usernameRef}/>
                    <input type="text" placeholder='Password' ref={passwordRef}/>
                    <input type="text" placeholder='Repeat password' ref={passwordTwoRef}/>
                    <div className='default-button' onClick={register}>Register</div>
                    <div className='error'><b>{error}</b></div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;