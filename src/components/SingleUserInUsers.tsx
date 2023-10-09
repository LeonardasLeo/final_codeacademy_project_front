import * as React from 'react';
import {UserTypes} from "../types";
import {SetStateAction} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";


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
        <div key={item._id} className='user-card justify-content-between'>
            <div className='d-flex align-items-center gap-3'>
                <img src={item.profilePic} alt="" loading='lazy'/>
                <div>{item.username}</div>
            </div>
            <div className='reaction' onClick={openModal}>
                <FontAwesomeIcon size='xl' icon={faCommentDots}/>
            </div>
        </div>
    );
};

export default SingleUserInUsers;