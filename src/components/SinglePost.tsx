import * as React from 'react';
import {IncomingDataTypes, UserTypes} from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {apiService} from "../api/api";
import {socket} from "../App";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SinglePost = ({post}: {post: UserTypes.Post}) => {
    const nav = useNavigate()
    const date: Date = new Date(post.timestamp)
    const dateString: string = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}h`
    const [error, setError] = useState<string>('')
    async function likePost (id: string) {
        const response:IncomingDataTypes.DefaultResponse = await apiService.likePost(id)
        if (!response.error){
            socket.emit('postLiked')
        }
    }
    async function dislikePost (id: string) {
        const response:IncomingDataTypes.DefaultResponse = await apiService.dislikePost(id)
        if (!response.error){
            socket.emit('postDisliked')
        }else{
            setError(response.message)
        }
    }

    function openPost (post) {
        nav(`/posts/${post._id}`)
    }

    return (
        <div className="p-3 post" style={{width: '15rem'}} onClick={() => openPost(post)}>
            <img src={post.image} className="post-image" alt="..."/>
            <div className='mt-1'>
                <h5 className="card-title">{post.title}</h5>
            </div>
            <div>{post.username}</div>
            <div style={{fontSize: '12px'}}>{dateString}</div>
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
                    <div>
                        <FontAwesomeIcon icon={faCommentDots}/>
                    </div>
                </div>
            </div>
            <div>{error}</div>
        </div>
    );
};

export default SinglePost;