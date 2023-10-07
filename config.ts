import {Config} from "./src/types";


const config: Config = {
    serverRoute: 'http://78.62.12.216:3001',
    token: () => {
        return localStorage.getItem('token') || sessionStorage.getItem('token')
    }
}

export default config