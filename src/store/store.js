import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../slice/projectSlice.js"
import taskReducer from "../slice/taskSlice.js"

export const store=configureStore({
    reducer:{
        projects:projectReducer,
        tasks:taskReducer,
    }
})