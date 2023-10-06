import {Config} from "./src/types";

export const getToken: () => string | null = () => {
    return config.token
}

const config: Config = {
    serverRoute: 'http://localhost:3001',
    token: localStorage.getItem('token') || sessionStorage.getItem('token')
}

export default config