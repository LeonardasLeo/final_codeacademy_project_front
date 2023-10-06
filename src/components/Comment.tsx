import {IncomingDataTypes, UserTypes} from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {apiService} from "../api/api.ts";
import {useState} from "react";
import {emitPostInteraction} from "../api/sockets.ts";

const Comment = ({item}: {item: UserTypes.Comment}) => {
    const [error, setError] = useState<string>('')
    function formatTimestamp(timestamp: Date): string {
        const date: Date = new Date(timestamp)
        return`${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}h`
    }

    async function likeComment(): Promise<void> {
        const response: IncomingDataTypes.DefaultResponse = await apiService.likeComment(item.id)
        if (!response.error){
            emitPostInteraction()
            setError('')
        }else{
            setError(response.message)
        }
    }
    async function dislikeComment(): Promise<void> {
        const response: IncomingDataTypes.DefaultResponse = await apiService.dislikeComment(item.id)
        if (!response.error){
            emitPostInteraction()
            setError('')
        }else{
            setError(response.message)
        }
    }
    return (
        <div className='comment'>
            <div className='name-and-timestamp'>
                <div>{item.username} |</div>
                <div>{formatTimestamp(item.timestamp)}</div>
            </div>
            <div>{item.comment}</div>
            <div className='comment-interaction-display'>
                <div className='d-flex gap-1'>
                    <div>{item.likes.length}</div>
                    <div className='reaction' onClick={() => likeComment()}>
                        <FontAwesomeIcon fontSize='12px' icon={faThumbsUp}/>
                    </div>
                </div>
                <div className='d-flex gap-1'>
                    <div>{item.dislikes.length}</div>
                    <div className='reaction' onClick={() => dislikeComment()}>
                        <FontAwesomeIcon fontSize='12px' icon={faThumbsDown}/>
                    </div>
                </div>
                <div className='error'>{error}</div>
            </div>

        </div>
    );
};

export default Comment;