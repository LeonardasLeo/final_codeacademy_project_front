import * as React from 'react';
import Select from "./Select";
import {SetStateAction, useEffect, useReducer} from "react";
import {ReduxTypes, UserTypes} from "../types";
import {useSelector} from "react-redux";

type SelectionsType = {
    commentFilter: string
    likeFilter: string
    timeFilter: string
}

type ActionType =
    | { type: 'setCommentFilter'; value: string }
    | { type: 'setLikeFilter'; value: string }
    | { type: 'setTimeFilter'; value: string };

function reducer (state: SelectionsType, action: ActionType): SelectionsType {
    switch (action.type) {
        case 'setCommentFilter':
            return { ...state, commentFilter: action.value };
        case 'setLikeFilter':
            return { ...state, likeFilter: action.value };
        case 'setTimeFilter':
            return { ...state, timeFilter: action.value };
        default:
            return state;
    }
}

type Props = {
    posts: UserTypes.Post[]
    setPosts: React.Dispatch<SetStateAction<UserTypes.Post[]>>
}

const SortBar = ({posts, setPosts}: Props) => {
    const defaultValue: string = 'None'
    const options: string[] = ['None', 'High to low', 'Low to high']
    const timeOptions: string[] = ['None', 'Newest', 'Oldest']
    const [state, dispatch] = useReducer(reducer, {commentFilter: defaultValue, likeFilter: defaultValue, timeFilter: defaultValue})
    const allPosts: UserTypes.Post[] = useSelector((state: ReduxTypes.ReduxStates) => state.states.allPosts)
    useEffect(() => {
        let result: number = 0
        const compare = (a: UserTypes.Post, b: UserTypes.Post): number => {
            if (state.commentFilter !== defaultValue){
                if (state.commentFilter === 'High to low'){
                    result = b.comments.length - a.comments.length
                }
                if (state.commentFilter === 'Low to high'){
                    result = a.comments.length - b.comments.length
                }
            }
            if (state.likeFilter !== defaultValue){
                if (state.likeFilter === 'High to low'){
                    result = b.likes.length - a.likes.length
                }
                if (state.likeFilter === 'Low to high'){
                    result = a.likes.length - b.likes.length
                }
            }
            if (state.timeFilter !== defaultValue){
                const dateOne: number = new Date(a.timestamp).getTime()
                const dateTwo: number = new Date(b.timestamp).getTime()
                if (state.timeFilter === 'Newest'){
                    result = dateTwo - dateOne
                }
                if (state.timeFilter === 'Oldest'){
                    result = dateOne - dateTwo
                }
            }
            return result
        }
        if (state.commentFilter === defaultValue && state.likeFilter === defaultValue && state.timeFilter === defaultValue){
            return setPosts(allPosts)
        }
        const sortedPosts: UserTypes.Post[] = [...posts].sort(compare)
        setPosts(sortedPosts)
    }, [state])

    return (
        <div className='d-flex gap-5'>
            <div className='d-flex align-items-center gap-2'>
                <div>Comment amount</div>
                <Select options={options} onSelect={(item: string) => dispatch({type: 'setCommentFilter', value: item})}/>
            </div>
            <div className='d-flex align-items-center gap-2'>
                <div>Like amount</div>
                <Select options={options} onSelect={(item: string) => dispatch({type: 'setLikeFilter', value: item})}/>
            </div>
            <div className='d-flex align-items-center gap-2'>
                <span>Time posted</span>
                <Select options={timeOptions} onSelect={(item: string) => dispatch({type: 'setTimeFilter', value: item})}/>
            </div>
        </div>
    );
};

export default SortBar;