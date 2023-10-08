import * as React from 'react';
import {ReduxTypes, UserTypes} from "../types";
import {SetStateAction} from "react";
import {useSelector} from "react-redux";
import {emitRequestRoomJoin} from "../api/sockets.ts";

type props = {
    item: UserTypes.User,
    selectedUser: UserTypes.User | undefined
    setSelectedUser: React.Dispatch<SetStateAction<UserTypes.User>>
}

const SingleUserInMessages = ({item, selectedUser,setSelectedUser}: props) => {
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)

    function joinRoom(): void {
        const roomName: string = `${user.username}-${item.username}-room`
        emitRequestRoomJoin(roomName, item)
    }

    return (
        <div className={`user-card ${item.username === selectedUser?.username && 'selected-user-card'}`} onClick={() => {
            setSelectedUser(item)
            joinRoom()
        }} style={{cursor: 'pointer'}}>
            <img src={item.profilePic} alt="" loading='lazy'/>
            <div>{item.username}</div>
        </div>
    );
};

export default SingleUserInMessages;