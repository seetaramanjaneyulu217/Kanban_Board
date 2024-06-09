import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    formType: string
}


const initialState: InitialState = {
    formType: 'signup'
}


const formTypeSlice = createSlice({
    name: 'formtype',
    initialState,
    reducers: {
        changeFormType: (state, action) => {
            state.formType = action.payload.formType
        }
    }
})


export const { changeFormType } = formTypeSlice.actions

export default formTypeSlice.reducer