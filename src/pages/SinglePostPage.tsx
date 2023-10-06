import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {apiService} from "../api/api";
import {IncomingDataTypes, ReduxTypes, UserTypes} from "../types";
import SingleUserInPost from "../components/SingleUserInPost";
import {useSelector} from "react-redux";

const SinglePostPage = () => {
    const {id} = useParams()
    const commentRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const [error, setError] = useState<string>('')
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)
    const [post, setPost] = useState<UserTypes.Post | undefined>(undefined)
    const [userWhoPosted, setUserWhoPosted] = useState<UserTypes.User | undefined>(undefined)
    useEffect(() => {
        apiService.getSinglePost(id)
            .then((res: IncomingDataTypes.PostData) => {
                if (!res.error){
                    setPost(res.data)
                }else{
                    setError(res.message)
                }
            })

    }, [id])
    useEffect(() => {
        if (post){
            console.log(post.username)
            apiService.getSingleUser(post.username)
                .then((res: IncomingDataTypes.UserData) => {
                    if (!res.error){
                        setUserWhoPosted(res.data)
                    }else{
                        setError(res.message)
                    }
                })
        }
    }, [post])

     async function comment () {
        const commentValue: string = commentRef.current.value
         if (commentValue === '') return setError('Please enter comment')
        const comment: UserTypes.Comment = {
            username: user.username,
            comment: commentValue,
            likes: 0,
            dislikes: 0,
            timestamp: new Date()
        }
        const response = await apiService.comment(comment)
         console.log(response)
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
                            <div>
                                <div className='likes'>{post.likes} likes</div>
                                <div className='likes'>{post.dislikes} dislikes</div>
                                <div>Posted on: {formatTimestamp(post.timestamp)}</div>
                            </div>
                            <div className='default-button'>Like</div>
                        </div>
                    </div>
                    <div className='flex-1 d-flex flex-column'>
                        <div className='comment-container'>
                            d
                            {post.comments.map((item: UserTypes.Comment) =>
                                <div>{item.comment}</div>
                            )}
                        </div>
                        <div className='comment-field'>
                            <input type="text" placeholder='Comment' ref={commentRef}/>
                            <div className='default-button' onClick={comment}>Comment</div>
                        </div>
                    </div>
                </div> :
                <div>Loading...</div>
            }
            <div>{error}</div>
        </div>
    );
};

export default SinglePostPage;