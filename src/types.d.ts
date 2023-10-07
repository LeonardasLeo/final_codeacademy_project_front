import {Socket} from "socket.io-client";

export type Config = {
    serverRoute: string,
    token: () => string
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
        id: number
        username: string
        comment: string
        likes: string[]
        dislikes: string[]
        timestamp: Date
    }
    export type Post = {
        _id: string
        username: string
        image: string
        title: string
        likes: string[]
        dislikes: string[]
        comments: Comment[]
        timestamp: Date
    }
    export type User = {
        _id: string
        username: string
        profilePic: string
        messages: {
            [username: string]: Message[]
        }
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

export namespace IncomingDataTypes {
    export type DefaultResponse = {
        error: boolean
        message: string | null
        data: null
    }

    export type UpdateUserData = {
        userOne: UserTypes.User
        userTwo: UserTypes.User
    }

    export interface UserData extends DefaultResponse{
        data: UserTypes.User
    }

    export interface PostData extends DefaultResponse{
        data: UserTypes.Post
    }

    export interface LoginData extends DefaultResponse {
        data: {
            user: UserTypes.User
            token: string,
            allPosts: UserTypes.Post[]
            allUsers: UserTypes.User[]
        }
    }
    export interface AllUserData extends DefaultResponse {
        data: {
            user: UserTypes.User
            allPosts: UserTypes.Post[]
            allUsers: UserTypes.User[]
        }
    }
}