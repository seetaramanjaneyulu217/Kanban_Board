import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    allLabels: string[];
}


const initialState: InitialState = {
    allLabels: []
}


const labelsSlice = createSlice({
    name: 'labels',
    initialState,
    reducers: {
        createLabel: (state, action) => {
            state.allLabels.push(action.payload.label)
        }
    }
})


export const { createLabel } = labelsSlice.actions

export default labelsSlice.reducer