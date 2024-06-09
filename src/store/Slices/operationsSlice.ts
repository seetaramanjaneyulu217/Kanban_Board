import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    assigneeName: string;
    searchText: string;
    sortByDate: boolean;
    labelText: string;
}


const initialState: InitialState = {
    assigneeName: 'all',
    searchText: '',
    sortByDate: false,
    labelText: ''
}


const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        populateAssigneeOption: (state, action) => {
            state.assigneeName = action.payload.assigneeName
        },
        populateSearchText: (state, action) => {
            state.searchText = action.payload.searchText
        },
        checkSortByDate: (state, action) => {
            state.sortByDate = action.payload.sortByDate
        },
        populateLabel: (state, action) => {
            state.labelText = action.payload.labelText
        }
    }
})


export const { populateAssigneeOption, populateSearchText, checkSortByDate, populateLabel } = operationsSlice.actions

export default operationsSlice.reducer