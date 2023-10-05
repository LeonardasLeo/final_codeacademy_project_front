import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {apiService} from "../api/api";
import {IncomingDataTypes, UserTypes} from "../types";
import SingleUserInPost from "../components/SingleUserInPost";

const SinglePostPage = () => {
    const {id} = useParams()
    const commentRef: React.MutableRefObject<HTMLInputElement> = useRef()
    const [error, setError] = useState<string>('')
    const [post, setPost] = useState<UserTypes.Post | undefined>(undefined)
    const [user, setUser] = useState<UserTypes.User | undefined>(undefined)
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
                .then((res: IncomingDataTypes.CurrentUserData) => {
                    if (!res.error){
                        setUser(res.data)
                    }else{
                        setError(res.message)
                    }
                })
        }
    }, [post])

    function comment () {

    }
    return (
        <div>
            {post && user ?
                <div className='p-5 d-flex flex-column'>
                    <div className='flex-1 d-flex'>
                        <div className='single-post-image flex-1'>
                            <img src={post.image} alt=""/>
                        </div>
                        <div className='flex-1'>
                            <SingleUserInPost item={user}/>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <div>
                            {post.comments.map((item: UserTypes.Comment) =>
                                <div>{item.comment}</div>
                            )}
                        </div>
                        <div>
                            <input type="text" placeholder='Comment' ref={commentRef}/>
                            <button onClick={comment}>Comment</button>
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