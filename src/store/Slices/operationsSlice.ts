import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    assigneeName: string;
}


const initialState: InitialState = {
    assigneeName: ''
}


const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        populateAssigneeOption: (state, action) => {
            state.assigneeName = action.payload.assigneeName
        }
    }
})


export const { populateAssigneeOption } = operationsSlice.actions

export default operationsSlice.reducer