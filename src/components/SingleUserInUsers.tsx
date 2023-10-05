import * as React from 'react';
import {ReduxTypes, UserTypes} from "../types";
import {SetStateAction, useState} from "react";
import {socket} from "../App";
import {useSelector} from "react-redux";

type props = {
    item: UserTypes.User
    setIsMessage?: React.Dispatch<SetStateAction<boolean>>
    setMessageTo?: React.Dispatch<SetStateAction<UserTypes.User>>
}

const SingleUserInUsers = ({item, setIsMessage, setMessageTo}: props)=> {
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)

    function sendMessage () {
        const roomName: string = `${user.username}-${item.username}-room`
        setIsMessage(true)
        setMessageTo(item)
        socket.emit('sendMessage', {roomName, userOne: user, userTwo: item})
    }

    return (
        <div key={item._id} className='user-card'>
            <img src={item.profilePic} alt=""/>
            <div className='d-flex flex-column justify-content-between'>
                <div>{item.username}</div>
                <button className='btn btn-dark' onClick={() => sendMessage()}>Send message</button>
            </div>
        </div>
    );
};

export default SingleUserInUsers;