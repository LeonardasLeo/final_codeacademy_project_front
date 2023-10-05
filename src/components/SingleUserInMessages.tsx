import * as React from 'react';
import {ReduxTypes, UserTypes} from "../types";
import {SetStateAction} from "react";
import {socket} from "../App";
import {useSelector} from "react-redux";

type props = {
    item: UserTypes.User,
    selectedUser: UserTypes.User | undefined
    setSelectedUser: React.Dispatch<SetStateAction<UserTypes.User>>
}

const SingleUserInMessages = ({item, selectedUser,setSelectedUser}: props) => {
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)

    function joinRoom() {
        const roomName: string = `${user.username}-${item.username}-room`
        socket.emit('requestJoinRoomFromClient', {roomName, userOne: user, userTwo: item})
    }
    return (
        <div className={`user-card ${item.username === selectedUser?.username && 'selected-user-card'}`} onClick={() => {
            setSelectedUser(item)
            joinRoom()
        }} style={{cursor: 'pointer'}}>
            <img src={item.profilePic} alt=""/>
            <div>{item.username}</div>
        </div>
    );
};

export default SingleUserInMessages;