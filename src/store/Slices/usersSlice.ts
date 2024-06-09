import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    users: User[];
    userLoggedIn: boolean;
    loggedInUsername: string;
}


const initialState: InitialState = {
    users: [],
    userLoggedIn: false,
    loggedInUsername: ''
}


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.users.push(action.payload)
        },
        makeUserLogIn: (state, action) => {
            state.userLoggedIn = action.payload.loggedIn
            state.loggedInUsername = action.payload.loggedInUsername
        }
    }
})


export const { createUser, makeUserLogIn } = usersSlice.actions

export default usersSlice.reducer