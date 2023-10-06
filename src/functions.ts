import React, {SetStateAction} from "react";
import {IncomingDataTypes, UserTypes} from "./types";
import {apiService} from "./api/api.ts";
import {socket} from "./App.tsx";

export async function sendMessage(
    messageRef: React.MutableRefObject<HTMLInputElement>,
    setError: React.Dispatch<SetStateAction<string>>,
    userOne: UserTypes.User,
    userTwo: UserTypes.User

) {
    const messageValue: string = messageRef.current.value
    if (messageValue === '') return setError('Please enter message')
    const response: IncomingDataTypes.DefaultResponse = await apiService.sendMessage(messageValue, userTwo)
    if (!response.data){
        const roomName: string = `${userOne.username}-${userTwo.username}-room`
        socket.emit('requestJoinRoomClient', {roomName, userOne, userTwo})
        socket.emit('sendMessage', {roomName, userOne, userTwo})
        messageRef.current.value = ''
    }else{
        setError(response.message)
    }
}