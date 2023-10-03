import * as React from 'react';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import config from "../config";
import {useRef, useState} from "react";
import {AxiosResponses} from "../types";

const ChangePasswordModal = () => {
    const serverRoute: string = config.serverRoute
    const passwordOneRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const passwordTwoRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const [error, setError] = useState<string>('')

    function changePassword (): void {
        const passwordOne: string = passwordOneRef.current.value
        const passwordTwo: string = passwordTwoRef.current.value
        if (passwordOne === '' || passwordTwo === '') return setError('Please dont leave empty fields')
        if (passwordOne.length < 4) return setError('Password must be longer than 4 letters')
        if (passwordOne.length > 20) return setError('Password cant be longer than 20 letters')
        if (passwordOne !== passwordTwo) return setError('Passwords must match')
        const options: AxiosRequestConfig = {
            headers: {
                'content-type': "application/json",
                authorization: config.token
            }
        }
        axios.post(`${serverRoute}/changePassword`, {passwordOne}, options)
            .then((res: AxiosResponse): void => {
                const data: AxiosResponses.ResponseData = res.data
                setError(data.message)
            })
            .catch((): void => {
                setError('Error changing password')
            })
    }

    return (
        <div className='d-flex flex-column gap-3 change-modal'>
            <input type="text" placeholder='New password' ref={passwordOneRef}/>
            <input type="text" placeholder='Repeat new password' ref={passwordTwoRef}/>
            <button className='btn btn-primary' onClick={changePassword}>Change</button>
            <div style={{color: error === 'Password changed' ? 'green' : 'red'}}>{error}</div>
        </div>
    );
};

export default ChangePasswordModal;