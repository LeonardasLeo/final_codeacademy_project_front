import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserTypes} from "../src/types";

type InitialType = {
    user?: UserTypes.User,
    allPosts?: UserTypes.Post[],
    allUsers?: UserTypes.User[]
}

const initialState: InitialType = {
    user: undefined,
    allPosts: undefined,
    allUsers: undefined
}

const statesSlice = createSlice({
    name: 'states',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserTypes.User>): void => {
            state.user = action.payload
        },
        updateAllPosts: (state, action: PayloadAction<UserTypes.Post[]>): void => {
            state.allPosts = action.payload
        },
        updateAllUsers: (state, action: PayloadAction<UserTypes.User[]>): void => {
            state.allUsers = action.payload
        }
    }
})

export const {
    updateUser,
    updateAllPosts,
    updateAllUsers
} = statesSlice.actions
export default statesSlice.reducer