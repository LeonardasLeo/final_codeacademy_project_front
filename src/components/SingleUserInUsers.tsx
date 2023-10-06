import * as React from 'react';
import {UserTypes} from "../types";
import {SetStateAction} from "react";


type props = {
    item: UserTypes.User
    setIsMessage?: React.Dispatch<SetStateAction<boolean>>
    setMessageTo?: React.Dispatch<SetStateAction<UserTypes.User>>
}

const SingleUserInUsers = ({item, setIsMessage, setMessageTo}: props)=> {
    function openModal(){
        setIsMessage(true)
        setMessageTo(item)
    }


    return (
        <div key={item._id} className='user-card'>
            <img src={item.profilePic} alt=""/>
            <div className='d-flex flex-column justify-content-between'>
                <div>{item.username}</div>
                <button className='btn btn-dark' onClick={() => openModal()}>Send message</button>
            </div>
        </div>
    );
};

export default SingleUserInUsers;