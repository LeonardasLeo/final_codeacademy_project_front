import {BrowserRouter, NavigateFunction, Route, Routes, useNavigate} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import * as React from "react";
import ProfilePage from "./pages/ProfilePage";
import config from "./config";
import Navbar from "./components/Navbar";
import {useEffect} from "react";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {AxiosResponses, UserTypes} from "./types";
import {useDispatch} from "react-redux";
import {updateUser} from "../features/users";

async function getUserData (token): Promise<UserTypes.User> {
    const options: AxiosRequestConfig = {
        headers: {
            authorization: token
        }
    }
    const response: AxiosResponse = await axios.get(`${config.serverRoute}/getUserData`, options)
    const data: AxiosResponses.UserData = response.data
    return data.data
}

function Root(): React.JSX.Element {
    const dispatch = useDispatch()
    const nav: NavigateFunction = useNavigate()
    const token: string = localStorage.getItem('token') || sessionStorage.getItem('token')
    useEffect(() => {
        if (token){
            config.token = token
            getUserData(token)
                .then((data: UserTypes.User): void => {
                    dispatch(updateUser(data))
                })
                .catch((e: Error) => console.log(e))
            return nav('/profile')
        }else{
            return nav('/login')
        }

    }, [])
  return (
    <div>
        {/*{token && <div>toolbar</div>}*/}
        <Navbar/>
        <Routes>
            <Route path='/' element={<RegisterPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
    </div>
  )
}

function App (): React.JSX.Element {
    return (
        <BrowserRouter>
            <Root/>
        </BrowserRouter>
    )
}

export default App
