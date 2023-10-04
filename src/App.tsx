import * as React from "react";
import {BrowserRouter, NavigateFunction, Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AxiosResponses, SocketType, UserTypes} from "./types";
import {useDispatch} from "react-redux";
import {updateAllPosts, updateAllUsers, updateUser} from "../features/states";
import {apiService} from "./api/api";
import { io } from "socket.io-client";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import PostPage from "./pages/PostPage";
import config from "../config";
import UserPage from "./pages/UserPage";
import MessagePage from "./pages/MessagePage";

export const socket: SocketType = io(config.serverRoute, {
    autoConnect: true,
    query: {
        token: config.token
    }
});

function Root(): React.JSX.Element {
    const dispatch = useDispatch()
    const nav: NavigateFunction = useNavigate()
    const JwtToken: string = localStorage.getItem('token') || sessionStorage.getItem('token')
    const [error, setError] = useState<string>('')
    useEffect((): void => {
        if (JwtToken){
            apiService.getUserData()
                .then((res: AxiosResponses.UserData): void => {
                    if (!res.error){
                        dispatch(updateUser(res.data.user))
                        dispatch(updateAllUsers(res.data.allUsers))
                        dispatch(updateAllPosts(res.data.allPosts))
                    }else{
                        setError(res.message)
                    }
                })
                .catch(e => console.log('Error getting user'))
            socket.on('updatePosts', (val: UserTypes.Post[]): void => {
                dispatch(updateAllPosts(val))
            })
            setError('')
            return nav('/profile')
        }else{
            return nav('/login')
        }

    }, [])
  return (
    <div>
        {/*{token && <div>toolbar</div>}*/}
        <Navbar/>
        {error && <div>{error}</div>}
        <Routes>
            <Route path='/' element={<RegisterPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/posts' element={<PostPage/>}/>
            <Route path='/users' element={<UserPage/>}/>
            <Route path='/messages' element={<MessagePage/>}/>
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
