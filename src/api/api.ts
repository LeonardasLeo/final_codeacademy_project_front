import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {AxiosResponses, OutgoingDataTypes} from "../types";
import config from "../../config.ts";

const serverRoute: string = config.serverRoute
const requestConfig: AxiosRequestConfig = {
    headers: {
        'content-type': 'application/json'
    }
}
const requestConfigWithAuth: AxiosRequestConfig = {
    headers: {
        'content-type': "application/json",
        authorization: config.token
    }
}

export const apiService = {
    async login(user: OutgoingDataTypes.LoginAndRegData): Promise<AxiosResponses.LoginData> {
        const response: AxiosResponse = await axios.post(`${serverRoute}/login`, user, requestConfig)
        return response.data
    },
    async register(user: OutgoingDataTypes.LoginAndRegData): Promise <AxiosResponses.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`${serverRoute}/register`, user, requestConfig)
        return response.data
    },
    async getUserData (): Promise<AxiosResponses.UserData> {
        const response: AxiosResponse = await axios.get(`${serverRoute}/getUserData`, requestConfigWithAuth)
        return response.data
    },
    async changePassword(passwordOne: string): Promise<AxiosResponses.DefaultResponse>{
        const response: AxiosResponse = await axios.post(`${serverRoute}/changePassword`, {passwordOne}, requestConfigWithAuth)
        return response.data
    },
    async changeProfilePicture(image: string): Promise<AxiosResponses.UserData> {
        const response: AxiosResponse = await axios.post(`${serverRoute}/changeProfilePic`, {image}, requestConfigWithAuth)
        return response.data
    },
    async addPost(data: OutgoingDataTypes.PostData): Promise<AxiosResponses.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`${serverRoute}/addPost`, data, requestConfigWithAuth)
        return response.data
    },
    async likePost(id: string): Promise<AxiosResponses.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`${serverRoute}/likePost`, {id}, requestConfigWithAuth)
        return response.data
    },
    async dislikePost(id: string): Promise<AxiosResponses.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`${serverRoute}/dislikePost`, {id}, requestConfigWithAuth)
        return response.data
    },
    async sendMessage(messageValue: string, to: string): Promise<AxiosResponses.DefaultResponse> {
        const response: AxiosResponse = await axios.post(`${serverRoute}/sendMessage`, {messageValue, to}, requestConfigWithAuth)
        console.log(config.token)
        return response.data
    }


}

