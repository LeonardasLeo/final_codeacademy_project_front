import * as React from 'react';
import {SetStateAction, useRef, useState} from "react";
import {AxiosResponses, ReduxTypes, UserTypes} from "../types";
import {apiService} from "../api/api";
import {useDispatch, useSelector} from "react-redux";
import {updateAllPosts} from "../../features/states";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {socket} from "../App";

type props = {
    to: string
    setIsMessage: React.Dispatch<SetStateAction<boolean>>
}

const MessageModal = ({to, setIsMessage}: props) => {
    const dispatch = useDispatch()
    const messageRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const [error, setError] = useState<string>('')
    async function sendMessage (): Promise<void> {
        const messageValue: string = messageRef.current.value
        if (messageValue === '') return setError('Please enter message')
        const response: AxiosResponses.DefaultResponse = await apiService.sendMessage(messageValue, to)
        if (!response.error){
            socket.emit('sendMessage')
            dispatch(updateAllPosts(response.data))
        }else{
            setError(response.message)
        }
    }

    return (
        <div className='custom-modal'>
            <div className='d-flex justify-content-end close-btn' onClick={() => setIsMessage(false)}>
                <FontAwesomeIcon icon={faTimes}/>
            </div>
            <input type="text" placeholder='Title' ref={messageRef}/>
            <button className='btn btn-primary' onClick={sendMessage}>Send message</button>
            <div style={{color: 'red'}}>{error}</div>
        </div>
    );
};

export default MessageModal;