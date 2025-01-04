import React, { useState } from "react";
import { Button, Flex, Modal } from "antd";
import useProjects from "../context/ProjectContext";
import { MoreOutlined } from "@ant-design/icons";
import ProjectModal from "./ProjectModal";

const ProjectDropdown = ({ projectData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const { upadteProject, deleteProject } = useProjects();
  const [project, setProject] = useState({
    id: projectData.id,
    name: projectData.name,
    isFavorite: projectData.isFavorite,
    color: projectData.color,
  });

  const handleDeleteProject = () => {
    deleteProject(projectData.id);
    setIsModalOpen(false);
  };

  const updateFavoriteProject = () => {
    upadteProject(projectData.id,{isFavorite:String(!(projectData.isFavorite))})
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        color="default"
        variant="link"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <MoreOutlined rotate="90" />
      </Button>
      <Modal
        width={300}
        className="lg:absolute lg:left-[230px] lg:top-[100px]"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        closeIcon={null}
      >
        <Flex vertical gap="middile">
          <Button
            color="default"
            variant="link"
            onClick={() => {
              setIsProjectModalOpen(!isProjectModalOpen);
              setIsModalOpen(!isModalOpen);
            }}
          >
            Edit
          </Button>
          <Button
            color="default"
            variant="link"
            onClick={updateFavoriteProject}
          >
            {projectData.isFavorite ? "Remove from Favorite" : "Add to Favorite"}
          </Button>
          <Button
            color="default"
            variant="link"
            onClick={handleDeleteProject}
          >
            Delete
          </Button>
        </Flex>
      </Modal>
      {isProjectModalOpen && isProjectModalOpen && (
        <ProjectModal
          isModalOpen={isProjectModalOpen}
          setIsModalOpen={setIsProjectModalOpen}
          project={project}
          setProject={setProject}
          updateProject={upadteProject}
        />
      )}
    </>
  );
};

export default ProjectDropdown;
