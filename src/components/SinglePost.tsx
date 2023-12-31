import {IncomingDataTypes, ReduxTypes, UserTypes} from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faThumbsDown, faThumbsUp, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {apiService} from "../api/api";
import React, {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {emitPostInteraction} from "../api/sockets.ts";
import useFormatTime from "../hooks/useFormatTime.ts";
import useInteractionCheck from "../hooks/useInteractionCheck.ts";
import {useSelector} from "react-redux";

const SinglePost = ({post}: {post: UserTypes.Post}) => {
    const nav: NavigateFunction = useNavigate()
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)
    const [error, setError] = useState<string>('')
    async function likePost (): Promise<void> {
        const response:IncomingDataTypes.DefaultResponse = await apiService.likePost(post._id)
        if (!response.error){
            emitPostInteraction()
            setError('')
        }
    }
    async function dislikePost (): Promise<void> {
        const response:IncomingDataTypes.DefaultResponse = await apiService.dislikePost(post._id)
        if (!response.error){
            emitPostInteraction()
            setError('')
        }else{
            setError(response.message)
        }
    }

    async function deletePost (): Promise<void> {
        const response:IncomingDataTypes.DefaultResponse = await apiService.deletePost(post._id)
        if (!response.error){
            emitPostInteraction()
            setError('')
        }else{
            setError(response.message)
        }
    }

    function openPost (): void {
        nav(`/posts/${post._id}`)
    }

    return (
        <div className="post" style={{width: '15rem'}} onClick={() => openPost()}>
            <img src={post.image} className="post-image" alt="..." loading='lazy'/>
            <div className='p-2'>
                <div className='mt-1'>
                    <h5 className="card-title">{post.title}</h5>
                </div>
                <div>{post.username}</div>
                <div className='post-date-display'>{useFormatTime(post.timestamp)}</div>
                <div className='d-flex align-items-center gap-4'>
                    <div className='reaction-and-count'>
                        <div>{post.likes.length}</div>
                        <div className='reaction' onClick={async (e: React.MouseEvent<HTMLDivElement>): Promise<void> => {
                            e.stopPropagation()
                            await likePost()
                        }}>
                            <FontAwesomeIcon className={useInteractionCheck('likes', post)} icon={faThumbsUp}/>
                        </div>
                    </div>
                    <div className='reaction-and-count'>
                        <div>{post.dislikes.length}</div>
                        <div className='reaction' onClick={async (e: React.MouseEvent<HTMLDivElement>): Promise<void> => {
                            e.stopPropagation()
                            await dislikePost()
                        }}>
                            <FontAwesomeIcon className={useInteractionCheck('dislikes', post)} icon={faThumbsDown}/>
                        </div>
                    </div>
                    <div className='reaction-and-count'>
                        <div>{post.comments.length}</div>
                        <div className='reaction' onClick={openPost}>
                            <FontAwesomeIcon icon={faCommentDots}/>
                        </div>
                    </div>
                    {post.username === user.username &&
                        <div className='delete-post-button' onClick={async (e: React.MouseEvent<HTMLDivElement>): Promise<void> => {
                            e.stopPropagation()
                            await deletePost()
                        }}><FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                    }
                </div>
            </div>
            <div>{error}</div>
        </div>
    );
};

export default SinglePost;