import * as React from 'react';
import {SetStateAction, useRef, useState} from "react";
import {AxiosResponses, ReduxTypes, UserTypes} from "../types";
import {apiService} from "../api/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../features/states";

type props =  {
    setIsPictureBeingChanged: React.Dispatch<SetStateAction<boolean>>
}

const ChangePictureModal = ({setIsPictureBeingChanged}: props) => {
    const dispatch = useDispatch()
    const imageRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>()
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)


    async function changePicture (): Promise<void> {
        const imageLink: string = imageRef.current.value
        if (imageLink === '') return setError('Please enter an image link')
        const data: AxiosResponses.UserData = await apiService.changeProfilePicture(imageLink)
        if (!data.error){
            dispatch(updateUser(data.data))
            console.log(data.data)
            setSuccess(data.message)
            setError('')
        }else{
            setError(data.message)
            setSuccess('')
        }
    }

    return (
        <div className='custom-modal'>
            <div className='d-flex justify-content-end close-btn' onClick={() => setIsPictureBeingChanged(false)}>
                <FontAwesomeIcon icon={faTimes}/>
            </div>
            <input type="text" placeholder='New picture url' ref={imageRef}/>
            <button className='btn btn-primary' onClick={changePicture}>Change</button>
            <div style={{color: 'red'}}>{error}</div>
            <div style={{color: 'green'}}>{success}</div>
        </div>
    );
};

export default ChangePictureModal;