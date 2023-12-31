import * as React from "react";
import {BrowserRouter, NavigateFunction, Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {IncomingDataTypes, SocketType, UserTypes} from "./types";
import {useDispatch} from "react-redux";
import {updateAllPosts, updateAllUsers, updateUser} from "../features/states";
import {apiService} from "./api/api";
import { io } from "socket.io-client";
import {store} from "./main";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import PostPage from "./pages/PostPage";
import config from "../config";
import UserPage from "./pages/UserPage";
import MessagePage from "./pages/MessagePage";
import SinglePostPage from "./pages/SinglePostPage";

export const socket: SocketType = io(config.serverRoute, {
    autoConnect: true,
});

function Root(): React.JSX.Element {
    const dispatch = useDispatch()
    const nav: NavigateFunction = useNavigate()
    const jwtToken: string = config.token()
    const [error, setError] = useState<string>('')
    useEffect((): void => {
        if (jwtToken){
            apiService.getUserData()
                .then((res: IncomingDataTypes.AllUserData): void => {
                    if (!res.error){
                        socket.emit('userConnected', config.token())
                        dispatch(updateUser(res.data.user))
                        dispatch(updateAllUsers(res.data.allUsers))
                        dispatch(updateAllPosts(res.data.allPosts))
                        setError('')
                        nav('/profile')
                    }else{
                        setError(res.message)
                    }
                })
                .catch(() => setError('Error getting user'))
        }else{
            nav('/login')
        }
        socket.on('updateAllUsers', (val: UserTypes.User[]): void => {
            dispatch(updateAllUsers(val))
        })
        socket.on('updatePosts', (val: UserTypes.Post[]): void => {
            dispatch(updateAllPosts(val))
        })
        socket.on('requestRoomJoinFromServer', ({roomName}: {roomName: string }): void => {
            socket.emit('joinRoom', roomName)
        })
        socket.on('updateUsers', ({userOne, userTwo}: IncomingDataTypes.UpdateUserData): void => {
            const user: UserTypes.User = store.getState().states.user
            if (user.username === userOne.username) dispatch(updateUser(userOne))
            if (user.username === userTwo.username) dispatch(updateUser(userTwo))
        })
    }, [])
  return (
    <div>
        {jwtToken && <Navbar/>}
        {!jwtToken && <div>{error}</div>}
        <Routes>
            <Route path='/' element={<RegisterPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/posts' element={<PostPage/>}/>
            <Route path='/posts/:id' element={<SinglePostPage/>}/>
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
