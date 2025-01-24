import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const BASE_API=(`${import.meta.env.VITE_API_URL}/todo/api/project`)

const initialState = {
  isLoading: true,
  error: null,
  projects: [],
};

export const fetchProjects = createAsyncThunk("fetchProjects", async () => {
  const response=await axios.get(`${BASE_API}`)
  const fetchedProjects=response.data.data
  return fetchedProjects;
});

export const addProject = createAsyncThunk("addProject", async (newProject) => {
  const response=await axios.post(`${BASE_API}/new`,newProject)
  return response.data.data;
});

export const updateProject = createAsyncThunk(
  "updateProject",
  async ({projectId, newProject}) => {
    const response=await axios.put(`${BASE_API}/update/${projectId}`,newProject)
    return newProject;
  }
);

export const deleteProject = createAsyncThunk(
  "deleteProject",
  async (projectId) => {
    const res=await axios.delete(`${BASE_API}/remove/${projectId}`)
    return projectId
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        (state.isLoading = false), (state.projects = action.payload);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        console.log("error", action.payload);
        state.error = action.payload;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        (state.isLoading = false), state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.projects = state.projects.map((project) =>
            project.id == action.payload.id ? action.payload : project
          ));
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.projects = state.projects.filter((project) =>
            project.id != action.payload
          ));
      })
  },
});

export default projectSlice.reducer;
