import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TodoistApi } from "@doist/todoist-api-typescript";
import axios from "axios";
axios.defaults.withCredentials = true;

const api = new TodoistApi(import.meta.env.VITE_TODOIST_API_KEY);

const BASE_API=(`${import.meta.env.VITE_API_URL}/todo/api/task`)

const initialState = {
  isLoading: true,
  error: null,
  tasks: [],
  completedTasks:[]
};

export const fetchTasks = createAsyncThunk("fetchTasks", async (id) => {
  const response=await axios.get(`${BASE_API}?project_id= ${id}`)
  const fetchedTasks=response.data.data
  return fetchedTasks;
});

export const addTask = createAsyncThunk("addTask", async ({ id, newTask }) => {
  const response=await axios.post(`${BASE_API}/new`,newTask)
  return { id, addedTask:response.data.data };
});

export const updateTask = createAsyncThunk(
  "updateTask",
  async ({ taskId, newTask }) => {
    const response=await axios.put(`${BASE_API}/update/${taskId}`,newTask)
    return {id:taskId,addedTask:newTask};
  }
);

export const deleteTask = createAsyncThunk("deleteTask", async (TaskId) => {
  const response=await axios.delete(`${BASE_API}/remove/${TaskId}`)
  return TaskId;
});

export const closeTask = createAsyncThunk("closeTask", async (taskId) => {
  const response=await axios.delete(`${BASE_API}/remove/${taskId}`)
  return taskId;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.completedTasks=[]
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        (state.isLoading = false);
        (state.tasks = action.payload);
        state.completedTasks=[]
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        console.log("error", action.error.message);
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        if (action.payload.addedTask.project_id == action.payload.id) {
          state.tasks.push(action.payload.addedTask);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id == action.payload.id ? action.payload.addedTask : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id != action.payload);
      })
      .addCase(closeTask.fulfilled, (state, action) => {
        state.completedTasks.push(state.tasks.find((task) => task.id == action.payload)),
        state.tasks = state.tasks.filter((task) => task.id != action.payload);
      });
  },
});

export default tasksSlice.reducer;
