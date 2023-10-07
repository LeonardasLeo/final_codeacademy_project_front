import {socket} from "../App.tsx";
import {UserTypes} from "../types";


export const emitProfilePicChange = (): void => {
    socket.emit('profilePictureChanged')
}

export const emitPostInteraction = (): void => {
    socket.emit('postInteraction')
}

export const emitRequestRoomJoin = (roomName: string, userTwo: UserTypes.User): void => {
    socket.emit('requestJoinRoomFromClient', {roomName, userTwo})
}

export const emitSendMessage = (roomName: string, userOne: UserTypes.User, userTwo: UserTypes.User): void => {
    socket.emit('sendMessage', {roomName, userOne, userTwo})
}