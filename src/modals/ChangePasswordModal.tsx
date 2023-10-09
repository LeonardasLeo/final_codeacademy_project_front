import * as React from 'react';
import {SetStateAction, useRef, useState} from "react";
import {IncomingDataTypes} from "../types";
import {apiService} from "../api/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

type props =  {
    setIsPasswordBeingChanged: React.Dispatch<SetStateAction<boolean>>
}

const ChangePasswordModal = ({setIsPasswordBeingChanged}: props) => {
    const passwordOneRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const passwordTwoRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>()

    async function changePassword (): Promise<void> {
        const passwordOne: string = passwordOneRef.current.value
        const passwordTwo: string = passwordTwoRef.current.value
        if (passwordOne === '' || passwordTwo === '') return setError('Please dont leave empty fields')
        if (passwordOne.length < 4) return setError('Password must be longer than 4 letters')
        if (passwordOne.length > 20) return setError('Password cant be longer than 20 letters')
        if (passwordOne !== passwordTwo) return setError('Passwords must match')
        const data: IncomingDataTypes.DefaultResponse = await apiService.changePassword(passwordOne)
        if (!data.error){
            setSuccess(data.message)
            setError('')
            setIsPasswordBeingChanged(false)
        }else{
            setError(data.message)
            setSuccess('')
        }
    }

    return (
        <div className='d-flex flex-column gap-3 custom-modal'>
            <div className='d-flex justify-content-end close-btn' onClick={() => setIsPasswordBeingChanged(false)}>
                <FontAwesomeIcon icon={faTimes}/>
            </div>
            <input type="text" placeholder='New password' ref={passwordOneRef}/>
            <input type="text" placeholder='Repeat new password' ref={passwordTwoRef}/>
            <button className='btn btn-primary' onClick={changePassword}>Change</button>
            <div className='error'>{error}</div>
            <div className='success'>{success}</div>
        </div>
    );
};

export default ChangePasswordModal;