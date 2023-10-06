import {socket} from "../App.tsx";

export const emitPostInteraction = (): void => {
    socket.emit('postInteraction')
}

export const emitUserInteraction = (): void => {
    socket.emit('userInteraction')
}