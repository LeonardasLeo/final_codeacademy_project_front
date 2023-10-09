import axios, {AxiosResponse} from "axios";
import {IncomingDataTypes, OutgoingDataTypes, UserTypes} from "../types";
import config from "../../config.ts";



axios.defaults.baseURL = config.serverRoute
axios.defaults.headers.post['content-type'] = 'application/json'

// function to get latest token value

const getAuthorization = (): {headers: {authorization: string | null}} => {
    return {
        headers: {
            authorization: config.token()
        }
    }
}

export const apiService = {
    async login(user: OutgoingDataTypes.LoginAndRegData): Promise<IncomingDataTypes.LoginData> {
        const response: AxiosResponse = await axios.post(`/login`, user)
        return response.data
    },
    async register(user: OutgoingDataTypes.LoginAndRegData): Promise <IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`/register`, user)
        return response.data
    },
    async getUserData (): Promise<IncomingDataTypes.AllUserData> {
        const response: AxiosResponse = await axios.get(`/getUserData`, getAuthorization())
        return response.data
    },
    async changePassword(passwordOne: string): Promise<IncomingDataTypes.DefaultResponse>{
        const response: AxiosResponse = await axios.post(`/changePassword`, {passwordOne}, getAuthorization())
        return response.data
    },
    async changeProfilePicture(image: string): Promise<IncomingDataTypes.UserData> {
        const response: AxiosResponse = await axios.post(`/changeProfilePic`, {image}, getAuthorization())
        return response.data
    },
    async addPost(data: OutgoingDataTypes.PostData): Promise<IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`/addPost`, data, getAuthorization())
        return response.data
    },
    async likePost(id: string): Promise<IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`/likePost`, {id}, getAuthorization())
        return response.data
    },
    async dislikePost(id: string): Promise<IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`/dislikePost`, {id}, getAuthorization())
        return response.data
    },
    async sendMessage(messageValue: string, to: UserTypes.User): Promise<IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`/sendMessage`, {messageValue, to}, getAuthorization())
        return response.data
    },
    async getSinglePost(id: string): Promise<IncomingDataTypes.PostData> {
        const response: AxiosResponse = await axios.post('/getSinglePost', {id}, getAuthorization())
        return response.data
    },
    async getSingleUser(username: string): Promise<IncomingDataTypes.UserData> {
        const response: AxiosResponse = await axios.post('/getSingleUser', {username}, getAuthorization())
        return response.data
    },
    async comment(comment: UserTypes.Comment, id: string): Promise<IncomingDataTypes.UserData> {
        const response: AxiosResponse = await axios.post('/comment', {comment, id}, getAuthorization())
        return response.data
    },
    async likeComment(commentId: number): Promise<IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post('/likeComment', {commentId}, getAuthorization())
        return response.data
    },
    async dislikeComment(commentId: number): Promise<IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post('/dislikeComment', {commentId}, getAuthorization())
        return response.data
    },
    async deletePost(id: string): Promise<IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post('/deletePost', {id}, getAuthorization())
        return response.data
    }
}

