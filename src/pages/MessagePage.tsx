import * as React from 'react';
import {useSelector} from "react-redux";
import {IncomingDataTypes, ReduxTypes, UserTypes} from "../types";
import SingleUserInMessages from "../components/SingleUserInMessages";
import {useEffect, useRef, useState} from "react";
import {socket} from "../App";
import {apiService} from "../api/api";

const MessagePage = () => {
    const messageRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const chatContainerRef: React.MutableRefObject<HTMLDivElement> = useRef()
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)
    const allUsers: UserTypes.User[] = useSelector((state: ReduxTypes.ReduxStates) => state.states.allUsers)
    const [selectedUser, setSelectedUser] = useState<UserTypes.User>(undefined)
    const [error, setError] = useState<string>('')
    useEffect(() => {
        if (selectedUser){
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [selectedUser && user.messages[selectedUser.username]]);
    async function sendMessage () {
        const messageValue: string = messageRef.current.value
        if (messageValue === '') return setError('Please enter message')
        const response: IncomingDataTypes.DefaultResponse = await apiService.sendMessage(messageValue, selectedUser)
        if (!response.error){
            const roomName: string = `${user.username}-${selectedUser.username}-room`
            socket.emit('sendMessage', {roomName, userOne: user, userTwo: selectedUser})
            messageRef.current.value = ''
        }else{
            setError(response.message)
        }
    }
    return (
        <div>
            {user && <div className='d-flex gap-3 p-5'>
                <div className='flex-1 d-flex flex-column gap-3'>
                    {allUsers &&
                        allUsers.map((item: UserTypes.User) =>
                            user.messages[item.username] && <SingleUserInMessages key={item._id} item={item} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
                        )
                    }
                </div>
                <div className='flex-4'>
                    {selectedUser &&
                        <div>
                            <div className='d-flex flex-column gap-3 message-display' ref={chatContainerRef}>
                                {user.messages[selectedUser.username].map((item: UserTypes.Message, index: number) =>
                                    <div key={index} className={`${item.sender === user.username && 'justify-content-end'} d-flex`}>
                                        <div className={`${item.sender === user.username && 'text-end'} message d-flex flex-column`}>
                                            <div>{item.sender}</div>
                                            <div>{item.value}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='toolbar'>
                                <input type="text" placeholder='Message' ref={messageRef}/>
                                <button className='send-button' onClick={sendMessage}>Send</button>
                            </div>
                            <div style={{color: 'red'}}>{error}</div>
                        </div>
                    }
                </div>
            </div>}
        </div>
    );
};

export default MessagePage;