import axios, {AxiosResponse} from "axios";
import {IncomingDataTypes, OutgoingDataTypes, UserTypes} from "../types";
import config from "../../config.ts";

const getToken: () => string | null = () => {
    return config.token
}

axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.headers.post['content-type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = getToken()

// function to get latest token value



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
        const response: AxiosResponse = await axios.get(`/getUserData`)
        return response.data
    },
    async changePassword(passwordOne: string): Promise<IncomingDataTypes.DefaultResponse>{
        const response: AxiosResponse = await axios.post(`/changePassword`, {passwordOne})
        return response.data
    },
    async changeProfilePicture(image: string): Promise<IncomingDataTypes.CurrentUserData> {
        const response: AxiosResponse = await axios.post(`/changeProfilePic`, {image})
        return response.data
    },
    async addPost(data: OutgoingDataTypes.PostData): Promise<IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`/addPost`, data)
        return response.data
    },
    async likePost(id: string): Promise<IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`/likePost`, {id})
        return response.data
    },
    async dislikePost(id: string): Promise<IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`/dislikePost`, {id})
        return response.data
    },
    async sendMessage(messageValue: string, to: UserTypes.User): Promise<IncomingDataTypes.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`/sendMessage`, {messageValue, to})
        return response.data
    },
    async getSinglePost(id: string): Promise<IncomingDataTypes.PostData> {
        const response: AxiosResponse = await axios.post('/getSinglePost', {id})
        return response.data
    },
    async getSingleUser(username: string): Promise<IncomingDataTypes.CurrentUserData> {
        const response: AxiosResponse = await axios.post('/getSingleUser', {username})
        return response.data
    }
}

