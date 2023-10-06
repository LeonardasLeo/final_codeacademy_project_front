import * as React from 'react';
import {SetStateAction, useRef, useState} from "react";
import {IncomingDataTypes, ReduxTypes, UserTypes} from "../types";
import {apiService} from "../api/api";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {socket} from "../App";

type props = {
    to: UserTypes.User
    setIsMessage: React.Dispatch<SetStateAction<boolean>>
}

const MessageModal = ({to, setIsMessage}: props) => {
    const messageRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    async function sendMessage (): Promise<void> {
        const messageValue: string = messageRef.current.value
        if (messageValue === '') return setError('Please enter message')
        const response: IncomingDataTypes.DefaultResponse = await apiService.sendMessage(messageValue, to)
        if (!response.error){
            const roomName: string = `${user.username}-${to.username}-room`
            socket.emit('requestJoinRoomFromClient', {roomName, userOne: user, userTwo: to})
            socket.emit('sendMessage', {roomName, userOne: user, userTwo: to})
            setSuccess(response.message)
            setError('')
        }else{
            setError(response.message)
            setSuccess('')
        }
    }

    return (
        <div className='custom-modal'>
            <div className='d-flex justify-content-end close-btn' onClick={() => setIsMessage(false)}>
                <FontAwesomeIcon icon={faTimes}/>
            </div>
            <input type="text" placeholder='Message' ref={messageRef}/>
            <button className='btn btn-primary' onClick={sendMessage}>Send message</button>
            <div className='error'>{error}</div>
            <div className='success'>{success}</div>
        </div>
    );
};

export default MessageModal;