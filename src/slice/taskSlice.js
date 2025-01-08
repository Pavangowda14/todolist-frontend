import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi(import.meta.env.VITE_TODOIST_API_KEY);

const initialState = {
  isLoading: true,
  error: null,
  tasks: [],
  completedTasks:[]
};

export const fetchTasks = createAsyncThunk("fetchTasks", async (id) => {
  const fetchedTasks = await api.getTasks({ project_id: id });
  return fetchedTasks;
});

export const addTask = createAsyncThunk("addTask", async ({ id, newTask }) => {
  const addedTask = await api.addTask(newTask);
  return { id, addedTask };
});

export const updateTask = createAsyncThunk(
  "updateTask",
  async ({ taskId, newTask }) => {
    const updatedTask = await api.updateTask(taskId, newTask);
    return updatedTask;
  }
);

export const deleteTask = createAsyncThunk("deleteTask", async (TaskId) => {
  await api.deleteTask(TaskId);
  return TaskId;
});

export const closeTask = createAsyncThunk("closeTask", async (taskId) => {
  await api.closeTask(taskId);
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
        console.log("error", action.payload);
        state.error = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        if (action.payload.addedTask.projectId == action.payload.id) {
            console.log(action.payload.addedTask)
          state.tasks.push(action.payload.addedTask);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id == action.payload.id ? action.payload : task
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
