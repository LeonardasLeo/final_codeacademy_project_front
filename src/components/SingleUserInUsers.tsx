import * as React from 'react';
import {UserTypes} from "../types";
import {SetStateAction, useState} from "react";

type props = {
    item: UserTypes.User
    setIsMessage?: React.Dispatch<SetStateAction<boolean>>
    setMessageTo?: React.Dispatch<SetStateAction<string>>
}

const SingleUserInUsers = ({item, setIsMessage, setMessageTo}: props)=> {

    return (
        <div key={item._id} className='user-card'>
            <img src={item.profilePic} alt=""/>
            <div className='d-flex flex-column justify-content-between'>
                <div>{item.username}</div>
                <button className='btn btn-dark' onClick={() => {
                    setIsMessage(true)
                    setMessageTo(item.username)
                }}>Send message</button>
            </div>
        </div>
    );
};

export default SingleUserInUsers;