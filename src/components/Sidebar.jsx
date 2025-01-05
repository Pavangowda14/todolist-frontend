import { Flex, Button } from "antd";
import React, { useState } from "react";
import ProjectsList from "./ProjectsList";
import TaskModal from "./TaskModal";
import useProjects from "../context/ProjectContext";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { projects, isLoading } = useProjects();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const showTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const navigate = useNavigate();
  const inboxId = projects.find((project) => project.isInboxProject)?.id;
  const allprojects = projects.filter((project) => !project.isInboxProject);
  const favoriteProjects = projects.filter((project) => project.isFavorite);

  if (isLoading) {
    return <h1 className="text-center text-xl font-bold">Loading...</h1>;
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
          <div className="flex items-center justify-center bg-orange-600 text-white rounded-full px-[5px] py-[4px] text-md">
            <PlusOutlined />
          </div>
          <span className="text-orange-600 font-semibold">Add task</span>
        </Button>
        <Button
          onClick={() => {
            navigate(`/project/${inboxId}`);
          }}
          color="default"
          variant="link"
          className="inline text-start"
        >
          Inbox
        </Button>
        {favoriteProjects && favoriteProjects.length > 0 && (
          <ProjectsList title="Favorite" projectList={favoriteProjects} />
        )}
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
