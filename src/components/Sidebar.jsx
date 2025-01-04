import { Flex, Button } from "antd";
import React, { useEffect, useState } from "react";
import ProjectsList from "./ProjectsList";
import TaskModal from "./TaskModal";
import { TodoistApi } from "@doist/todoist-api-typescript";
import useProjects from "../context/ProjectContext";
import {PlusOutlined } from "@ant-design/icons";

const api = new TodoistApi("a16d266303c18f963a53ff4e13fa2e4304250c47");

const Sidebar = () => {
  const { projects, isLoading }=useProjects();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  
  const showTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const allprojects=projects.filter((project)=>!project.isInboxProject)
  const favoriteProjects=projects.filter((project)=>project.isFavorite)
  
  if(isLoading){
    return (<h1>Loading...</h1>)
  }

  return (
    <Flex vertical>
      <h3 className="p-3 text-lg font-bold">Pavan</h3>
      <Flex gap="small" vertical>
        <Button
          color="default"
          variant="link"
          onClick={showTaskModal}
          className="flex justify-start "
        >
          <div className="flex items-center justify-center bg-orange-600 text-white rounded-full px-[5px] py-[4px] text-md"><PlusOutlined /></div>
          <span className="text-orange-600 font-semibold">Add task</span>
        </Button>
        <Button color="default" variant="link" className="inline text-start">
          Inbox
        </Button>
       {favoriteProjects && (favoriteProjects.length>0) && <ProjectsList title="Favorite" projectList={favoriteProjects} />} 
        <ProjectsList
          title="My Projects"
          addProjectModal={{ isProjectModalOpen, setIsProjectModalOpen }}
          projectList={allprojects}
        />
        {isTaskModalOpen && (
          <TaskModal
            isModalOpen={isTaskModalOpen}
            setIsModalOpen={setIsTaskModalOpen}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
