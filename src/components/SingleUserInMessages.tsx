import * as React from 'react';
import {UserTypes} from "../types";
import {SetStateAction} from "react";

type props = {
    item: UserTypes.User
    setSelectedUser: React.Dispatch<SetStateAction<string>>
}

const SingleUserInMessages = ({item, setSelectedUser}: props) => {
    return (
        <div key={item._id} className='user-card' onClick={() => setSelectedUser(item.username)} style={{cursor: 'pointer'}}>
            <img src={item.profilePic} alt=""/>
            <div>{item.username}</div>
        </div>
    );
};

export default SingleUserInMessages;