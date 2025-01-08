import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi(import.meta.env.VITE_TODOIST_API_KEY);

const initialState = {
  isLoading: true,
  error: null,
  projects: [],
};

export const fetchProjects = createAsyncThunk("fetchProjects", async () => {
  const fetchedProjects = await api.getProjects();
  return fetchedProjects;
});

export const addProject = createAsyncThunk("addProject", async (newProject) => {
  const addedProject = await api.addProject(newProject);
  return addedProject;
});

export const updateProject = createAsyncThunk(
  "updateProject",
  async ({projectId, newProject}) => {
    console.log(projectId,newProject)
    const updatedProject = await api.updateProject(projectId, newProject);
    console.log(updatedProject)
    return updatedProject;
  }
);

export const deleteProject = createAsyncThunk(
  "deleteProject",
  async (projectId) => {
    await api.deleteProject(projectId);
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
