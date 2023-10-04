import * as React from 'react';
import {useSelector} from "react-redux";
import {ReduxTypes, UserTypes} from "../types";
import {useState} from "react";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import ChangePictureModal from "../modals/ChangePictureModal";
import '../App.css'

const ProfilePage = () => {
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)
    const [isPasswordBeingChanged, setIsPasswordBeingChanged] = useState<boolean>(false)
    const [isPictureBeingChanged, setIsPictureBeingChanged] = useState<boolean>(false)
    return (
        <div>
            {user &&
                <div className='p-3'>
                    {isPasswordBeingChanged && <ChangePasswordModal setIsPasswordBeingChanged={setIsPasswordBeingChanged}/>}
                    {isPictureBeingChanged && <ChangePictureModal setIsPictureBeingChanged={setIsPictureBeingChanged}/>}
                    <div className={`d-flex align-items-center gap-4 ${(isPictureBeingChanged || isPasswordBeingChanged) && 'opacity events-none'}`}>
                        <div className='profile-pic'>
                            <img src={user.profilePic} alt=""/>
                        </div>
                        <div className='d-flex flex-column gap-2'>
                            <div className='fs-5'><b>{user.username}</b></div>
                            <div className='change' onClick={() => setIsPasswordBeingChanged(true)}>Change password</div>
                            <div className='change' onClick={() => setIsPictureBeingChanged(true)}>Change pic</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProfilePage;