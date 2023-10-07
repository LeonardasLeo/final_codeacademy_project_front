import * as React from 'react';
import {IncomingDataTypes, ReduxTypes, UserTypes} from "../types";
import {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {apiService} from "../api/api";
import {emitRequestRoomJoin, emitSendMessage} from "../api/sockets.ts";

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
            emitRequestRoomJoin(roomName, item)
            emitSendMessage(roomName, user, item)
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
                    <div className='d-flex flex-column justify-content-between gap-3'>
                        <div>{item.username}</div>
                        {item.username !== user.username &&
                            <div className='d-flex send-message-from-post'>
                                <input type="text" placeholder='Write message' ref={messageRef}/>
                                <div className='default-button' onClick={() => sentMessage()}>Send message</div>
                                <div className='error'>{error}</div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default SingleUserInPost;