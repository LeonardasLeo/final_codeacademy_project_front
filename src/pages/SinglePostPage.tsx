import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {apiService} from "../api/api";
import {IncomingDataTypes, ReduxTypes, UserTypes} from "../types";
import SingleUserInPost from "../components/SingleUserInPost";
import {useSelector} from "react-redux";
import Comment from "../components/Comment.tsx";
import {emitPostInteraction} from "../api/sockets.ts";

const SinglePostPage = () => {
    const {id} = useParams()
    const commentRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const commentContainerRef: React.MutableRefObject<HTMLDivElement> = useRef()
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)
    const [error, setError] = useState<string>('')
    const [post, setPost] = useState<UserTypes.Post | undefined>(undefined)
    const [userWhoPosted, setUserWhoPosted] = useState<UserTypes.User | undefined>(undefined)
    const allPosts: UserTypes.Post[] = useSelector((state: ReduxTypes.ReduxStates) => state.states.allPosts)
    useEffect((): void => {
        apiService.getSinglePost(id)
            .then((res: IncomingDataTypes.PostData) => {
                if (!res.error){
                    setPost(res.data)
                }else{
                    setError(res.message)
                }
            })
    }, [id, allPosts])

    useEffect((): void => {
        if (post){
            apiService.getSingleUser(post.username)
                .then((res: IncomingDataTypes.UserData) => {
                    if (!res.error){
                        setUserWhoPosted(res.data)
                    }else{
                        setError(res.message)
                    }
                })
            if (post && commentContainerRef.current){
                commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight;
            }
        }
    }, [post])

    async function likePost (): Promise<void> {
        const response:IncomingDataTypes.DefaultResponse = await apiService.likePost(post._id)
        if (!response.error){
            emitPostInteraction()
            setError('')
        }
    }

     async function comment (): Promise<void> {
        const commentValue: string = commentRef.current.value
         if (commentValue === '') return setError('Please enter comment')
        const comment: UserTypes.Comment = {
             id: Math.random(),
            username: user.username,
            comment: commentValue,
            likes: [],
            dislikes: [],
            timestamp: new Date()
        }
        const response: IncomingDataTypes.UserData = await apiService.comment(comment, post._id)
         if (!response.error){
             emitPostInteraction()
             setError('')
         }else{
             setError(response.message)
         }
    }
    function formatTimestamp(timestamp: Date): string {
        const date: Date = new Date(timestamp)
        return`${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}h`
    }
    return (
        <div>
            {post && user ?
                <div className='p-5 d-flex flex-column gap-3'>
                    <div className='flex-1 d-flex gap-3'>
                        <div className='single-post-image flex-1'>
                            <img src={post.image} alt=""/>
                        </div>
                        <div className='flex-1 d-flex flex-column justify-content-between'>
                            <div>
                                <SingleUserInPost item={userWhoPosted}/>
                                <div className='mt-3 single-post-title'>{post.title}</div>
                            </div>
                            <div className='single-post-data white-text'>
                                <div className='likes'>{post.likes.length} likes</div>
                                <div className='likes'>{post.dislikes.length} dislikes</div>
                                <div>Posted on: {formatTimestamp(post.timestamp)}</div>
                            </div>
                            <div className='default-button' onClick={likePost}>Like</div>
                        </div>
                    </div>
                    <div className='flex-1 d-flex flex-column'>
                        <div className='comment-container' ref={commentContainerRef}>
                            {post.comments.map((item: UserTypes.Comment) =>
                                <Comment key={item.id} item={item}/>
                            )}
                        </div>
                        <div className='comment-field'>
                            <input type="text" placeholder='Comment' ref={commentRef}/>
                            <div className='default-button' onClick={comment}>Comment</div>
                        </div>
                    </div>
                </div> :
                <div className='loading'>Loading...</div>
            }
            <div className='error'>{error}</div>
        </div>
    );
};

export default SinglePostPage;