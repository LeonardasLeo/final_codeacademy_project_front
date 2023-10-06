import * as React from 'react';
import {IncomingDataTypes, ReduxTypes, UserTypes} from "../types";
import {SetStateAction, useRef, useState} from "react";
import {socket} from "../App";
import {useSelector} from "react-redux";
import {apiService} from "../api/api";

type props = {
    item: UserTypes.User
}

const SingleUserInPost = ({item}: props)=> {
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)
    const messageRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const [error, setError] = useState<string>('')

    async function sentMessage (): Promise<void> {
        const messageValue: string = messageRef.current.value
        if (messageValue === '') return setError('Please enter message')
        const response: IncomingDataTypes.DefaultResponse = await apiService.sendMessage(messageValue, item)
        if (!response.data){
            const roomName: string = `${user.username}-${item.username}-room`
            socket.emit('requestJoinRoomClient', {roomName, userOne: user, userTwo: item})
            socket.emit('sendMessage', {roomName, userOne: user, userTwo: item})
            messageRef.current.value = ''
        }else{
            setError(response.message)
        }

    }

    return (
        <div>
            {item &&
                <div key={item._id} className='user-card'>
                    <img src={item.profilePic} alt=""/>
                    <div className='d-flex flex-column justify-content-between'>
                        <div>{item.username}</div>
                        {item.username !== user.username &&
                            <div className='d-flex gap-3'>
                                <input type="text" placeholder='Write message' ref={messageRef}/>
                                <button className='btn btn-dark' onClick={() => sentMessage()}>Send message</button>
                                <div style={{color: 'red'}}>{error}</div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default SingleUserInPost;