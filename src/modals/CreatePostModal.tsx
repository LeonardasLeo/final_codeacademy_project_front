import * as React from 'react';
import {SetStateAction, useRef, useState} from "react";
import {IncomingDataTypes, OutgoingDataTypes} from "../types";
import {apiService} from "../api/api";
import {useDispatch} from "react-redux";
import {updateAllPosts} from "../../features/states";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {socket} from "../App";

type props = {
    setIsCreatePost: React.Dispatch<SetStateAction<boolean>>
}

const CreatePostModal = ({setIsCreatePost}: props) => {
    const dispatch = useDispatch()
    const titleRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const imageRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const [error, setError] = useState<string>('')
    async function addPost (): Promise<void> {
        const title: string = titleRef.current.value
        const image: string = imageRef.current.value
        if (title === '' || image === '') return setError('Please dont leave empty fields')
        const post: OutgoingDataTypes.PostData = {
            title,
            image
        }
        const response: IncomingDataTypes.DefaultResponse = await apiService.addPost(post)
        if (!response.error){
            socket.emit('postAdded')
            dispatch(updateAllPosts(response.data))
        }else{
            setError(response.message)
        }
    }

    return (
        <div className='custom-modal'>
            <div className='d-flex justify-content-end close-btn' onClick={() => setIsCreatePost(false)}>
                <FontAwesomeIcon icon={faTimes}/>
            </div>
            <input type="text" placeholder='Title' ref={titleRef}/>
            <input type="text" placeholder='Image' ref={imageRef}/>
            <button className='btn btn-primary' onClick={addPost}>Add post</button>
            <div style={{color: 'red'}}>{error}</div>
        </div>
    );
};

export default CreatePostModal;