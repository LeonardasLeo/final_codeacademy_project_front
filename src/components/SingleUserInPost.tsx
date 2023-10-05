import * as React from 'react';
import {ReduxTypes, UserTypes} from "../types";
import {SetStateAction, useState} from "react";
import {socket} from "../App";
import {useSelector} from "react-redux";

type props = {
    item: UserTypes.User
}

const SingleUserInUsers = ({item}: props)=> {
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)

    function sentMessage () {
        const roomName: string = `${user.username}-${item.username}-room`
        socket.emit('sendMessage', {roomName, userOne: user, userTwo: item})

    }

    return (
        <div key={item._id} className='user-card'>
            <img src={item.profilePic} alt=""/>
            <div className='d-flex flex-column justify-content-between'>
                <div>{item.username}</div>
                <div className='d-flex gap-3'>
                    <input type="text"/>
                    <button className='btn btn-dark' onClick={() => sentMessage()}>Send message</button>
                </div>
            </div>
        </div>
    );
};

export default SingleUserInUsers;