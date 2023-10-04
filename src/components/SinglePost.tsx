import * as React from 'react';
import {AxiosResponses, UserTypes} from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {apiService} from "../api/api";
import {socket} from "../App";
import {useState} from "react";

const SinglePost = ({post}: {post: UserTypes.Post}) => {
    const [error, setError] = useState<string>('')
    async function likePost (id: string) {
        const response:AxiosResponses.DefaultResponse = await apiService.likePost(id)
        if (!response.error){
            socket.emit('postLiked')
        }
    }
    async function dislikePost (id: string) {
        const response:AxiosResponses.DefaultResponse = await apiService.dislikePost(id)
        if (!response.error){
            socket.emit('postLiked')
        }
    }
    return (
        <div className="card p-3" style={{width: '15rem'}}>
            <img src={post.image} className="card-img post-image" alt="..."/>
            <div className='mt-2'>
                <h5 className="card-title">{post.title}</h5>
            </div>
            <div className='d-flex align-items-center gap-4'>
                <div className='reaction-and-count'>{post.likes}
                    <div className='reaction' onClick={() => likePost(post._id)}>
                        <FontAwesomeIcon icon={faThumbsUp}/>
                    </div>
                </div>
                <div className='reaction-and-count'>{post.dislikes}
                    <div className='reaction' onClick={() => dislikePost(post._id)}>
                        <FontAwesomeIcon icon={faThumbsDown}/>
                    </div>
                </div>
                <div className='reaction-and-count'>{post.comments.length}
                    <div className='reaction'>
                        <FontAwesomeIcon icon={faCommentDots}/>
                    </div>
                </div>
            </div>
            <div>{error}</div>
        </div>
    );
};

export default SinglePost;