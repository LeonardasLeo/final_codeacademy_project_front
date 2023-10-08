import {useEffect, useState} from "react";
import CreatePostModal from "../modals/CreatePostModal";
import {useSelector} from "react-redux";
import {ReduxTypes, UserTypes} from "../types";
import SinglePost from "../components/SinglePost";
import SortBar from "../components/SortBar";

const PostPage = () => {
    const allPosts: UserTypes.Post[] = useSelector((state: ReduxTypes.ReduxStates) => state.states.allPosts)
    const [isCreatePost, setIsCreatePost] = useState<boolean>(false)
    const [posts, setPosts] = useState<UserTypes.Post[]>(allPosts)
    useEffect(() => {
        setPosts(allPosts)
    }, [allPosts])
    return (
        <div>
            {isCreatePost && <CreatePostModal setIsCreatePost={setIsCreatePost}/>}
            <div className={`${isCreatePost && 'events-none opacity'}`}>
                <div className='mt-4 sort-bar px-5'>
                    <div className='fw-bold'>Sort by: </div>
                    <SortBar posts={posts} setPosts={setPosts}/>
                    <div className='default-button' onClick={() => setIsCreatePost(true)}>Create Post</div>
                </div>
                {posts && posts.length > 0 ?
                    <div className='d-flex mx-auto flex-wrap gap-3 p-5'>
                        {posts.map((item: UserTypes.Post) =>
                            <SinglePost key={item._id} post={item}/>
                        )}
                    </div>
                    : <div className='white-text d-flex justify-content-center'>No posts yet</div>
                }
            </div>
        </div>
    );
};

export default PostPage;