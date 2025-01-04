import React, { createContext, useState, useEffect, useContext } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi("a16d266303c18f963a53ff4e13fa2e4304250c47");

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const fetchedProjects = await api.getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = async (newProject) => {
    try {
      const addedProject = await api.addProject(newProject);
      setProjects((prev) => [...prev, addedProject]);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const upadteProject = async (projectId, newProject) => {
    try {
      const updatedProject = await api.updateProject(projectId, newProject);
      console.log(updatedProject)
      setProjects((prev) => prev.map((proj)=>(proj.id == projectId ? updatedProject : proj)));
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };


  const deleteProject = async (projectId) => {
    try {
      await api.deleteProject(projectId);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        isLoading,
        fetchProjects,
        addProject,
        deleteProject,
        upadteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default function useProjects() {
  return useContext(ProjectContext);
}
