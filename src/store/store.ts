import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '../store/Slices/TasksSlice'
import usersReducer from '../store/Slices/usersSlice'
import formTypeReducer from '../store/Slices/signupFormSlice'
import operationsReducer from '../store/Slices/operationsSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        users: usersReducer,
        formType: formTypeReducer,
        operations: operationsReducer
    }
})