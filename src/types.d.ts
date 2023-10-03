import {AxiosResponse} from "axios";

export type Config = {
    serverRoute: string,
    token: string | null
}

export namespace UserTypes{
    export type Comment = {
        username: string,
        comment: string,
        likes: number,
        dislikes: number
    }

    export type Post = {
        image: string,
        title: string,
        likes: number,
        dislikes: number,
        comments: Comment[]
    }

    export type User = {
        username: string,
        profilePic: string,
        messages: object,
        myPosts: Post[]
    }
}

export namespace ReduxTypes {
    export type ReduxUsers = {
        users: {
            user?: UserTypes.User
        }
    }
}

export namespace AxiosResponses {
    export type ResponseData = {
        error: boolean
        message: string | null
        data: null
    }
    export interface LoginData extends ResponseData {
        data: {
            user: UserTypes.User
            token: string
        }
    }
    export interface UserData extends ResponseData {
        data: UserTypes.User
    }
}