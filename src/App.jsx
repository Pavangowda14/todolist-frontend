import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import LayoutDesign from "./layout/Layout";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  return (
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutDesign />}>
              <Route index element={<Home />}></Route>
              <Route path="/project/:id" element={<ProjectDetail />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
  );
};

export default App;
