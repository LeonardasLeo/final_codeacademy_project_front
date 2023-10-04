import {Socket} from "socket.io-client";

export type Config = {
    serverRoute: string
    token: string | null
}

export type SocketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

export namespace OutgoingDataTypes {
    export type LoginAndRegData = {
        username: string
        password: string
    }
    export type PostData = {
        title: string
        image: string
    }
}

export namespace UserTypes{
    export type Comment = {
        username: string
        comment: string
        likes: number
        dislikes: number
    }
    export type Post = {
        _id: string
        image: string
        title: string
        likes: number
        dislikes: number
        comments: Comment[]
    }
    export type User = {
        _id: string
        username: string
        profilePic: string
        messages: object
    }
    export type Message = {
        sender: string,
        value: string
    }
}

export namespace ReduxTypes {
    export type ReduxStates = {
        states: {
            user?: UserTypes.User
            allPosts?: UserTypes.Post[]
            allUsers?: UserTypes.User[]
        }
    }
}

export namespace AxiosResponses {
    export type DefaultResponse = {
        error: boolean
        message: string | null
        data: null
    }
    export interface LoginData extends DefaultResponse {
        data: {
            user: UserTypes.User
            token: string,
            allPosts: UserTypes.Post[]
            allUsers: UserTypes.User[]
        }
    }
    export interface UserData extends DefaultResponse {
        data: {
            user: UserTypes.User
            allPosts: UserTypes.Post[]
            allUsers: UserTypes.User[]
        }
    }
}