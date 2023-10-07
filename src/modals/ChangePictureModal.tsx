import * as React from 'react';
import {SetStateAction, useRef, useState} from "react";
import {IncomingDataTypes} from "../types";
import {apiService} from "../api/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {updateUser} from "../../features/states";
import {emitProfilePicChange} from "../api/sockets.ts";

type props =  {
    setIsPictureBeingChanged: React.Dispatch<SetStateAction<boolean>>
}

const ChangePictureModal = ({setIsPictureBeingChanged}: props) => {
    const dispatch = useDispatch()
    const imageRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>()

    async function changePicture (): Promise<void> {
        const imageLink: string = imageRef.current.value
        if (imageLink === '') return setError('Please enter an image link')
        const data: IncomingDataTypes.UserData = await apiService.changeProfilePicture(imageLink)
        if (!data.error){
            dispatch(updateUser(data.data))
            emitProfilePicChange()
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
            <div className='error'>{error}</div>
            <div className='success'>{success}</div>
        </div>
    );
};

export default ChangePictureModal;