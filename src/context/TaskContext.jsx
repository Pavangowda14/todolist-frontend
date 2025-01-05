import React, { useState, createContext, useContext } from "react";

import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi(import.meta.env.VITE_TODOIST_API_KEY);

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTask = async (id) => {
    try {
      setIsLoading(true);
      const res = await api.getTasks({ project_id: id });
      setTasks(res);
    } catch (error) {
      console.error("error while fetching tasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (id,newTask) => {
    try {
      const res = await api.addTask(newTask);
      console.log(res)
      if(newTask.project_id==id){
      setTasks((prev) => [...prev, res]);
      }
    } catch (error) {
      console.error("error adding task", error);
    }
  };

  const deleteTask=async (id)=>{
    try {
      await api.deleteTask(id)
      setTasks((prev)=>prev.filter((task)=>task.id!=id))
    } catch (error) {
      console.error("error deleting task", error);
    }
  }

  const updateTask=async (id,newTask)=>{
    try {
      const res=await api.updateTask(id,newTask)
      console.log(res)
      setTasks((prev)=>prev.map((task)=>task.id==id?res:task))
    } catch (error) {
      console.error("error updating task", error);
    }
  }

  const closeTask=async (id)=>{
    try {
      await api.closeTask(id)
      setTasks((prev)=>prev.filter((task)=>task.id!=id))
    } catch (error) {
      console.error("error closing task", error);
    }
  }

  return (
    <TaskContext.Provider value={{ fetchTask, tasks, isLoading, addTask, deleteTask, updateTask, closeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default function useTasks() {
  return useContext(TaskContext);
}