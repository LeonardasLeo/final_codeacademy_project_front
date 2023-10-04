import * as React from 'react';
import {useState} from "react";
import CreatePostModal from "../modals/CreatePostModal";
import {useSelector} from "react-redux";
import {ReduxTypes, UserTypes} from "../types";
import SinglePost from "../components/SinglePost";


const PostPage = () => {
    const posts: UserTypes.Post[] = useSelector((state: ReduxTypes.ReduxStates) => state.states.allPosts)
    const [isCreatePost, setIsCreatePost] = useState<boolean>(false)
    return (
        <div>
            {isCreatePost && <CreatePostModal setIsCreatePost={setIsCreatePost}/>}
            <div className={`${isCreatePost && 'events-none opacity'}`}>
                <div>
                    sort by
                    <button onClick={() => setIsCreatePost(true)}>Create Post</button>
                </div>
                {posts &&
                    <div className='d-flex mx-auto flex-wrap gap-3 p-5'>
                        {posts.map((item: UserTypes.Post) =>
                            <SinglePost key={item._id} post={item}/>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default PostPage;