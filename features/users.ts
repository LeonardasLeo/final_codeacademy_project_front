import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserTypes} from "../src/types";

type InitialType = {
    user?: UserTypes.User
}

const initialState: InitialType = {
    user: undefined
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserTypes.User>): void => {
            state.user = action.payload
        }
    }
})

export const {updateUser} = usersSlice.actions
export default usersSlice.reducer