import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '../store/Slices/TasksSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer
    }
})