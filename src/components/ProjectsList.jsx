import React, { useState } from "react";
import { Button, Flex, Modal } from "antd";
import ProjectModal from "./ProjectModal";
import {
  PlusOutlined,
  DownOutlined,
  RightOutlined,
} from "@ant-design/icons";
import useProjects from "../context/ProjectContext";
import { getColorCode } from "../helper/color";

import { TodoistApi } from "@doist/todoist-api-typescript";
import ProjectDropdown from "./ProjectDropdown";
import { useNavigate } from "react-router-dom";

const api = new TodoistApi("a16d266303c18f963a53ff4e13fa2e4304250c47");

const ProjectsList = ({ title, addProjectModal, projectList }) => {
  const { addProject, deleteProject } = useProjects();
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState({
    name: "",
    color: "charcoal",
    isFavorite: false,
  });
const navigate=useNavigate()

  return (
    <Flex vertical>
      <Flex>
        <Button
          color="default"
          variant="link"
          style={{ display: "inline", textAlign: "start", flexGrow: 1 }}
          onClick={()=>navigate("/")}
        >
          {title}
        </Button>
        {addProjectModal && (
          <Button
            color="default"
            variant="link"
            onClick={() =>
              addProjectModal.setIsProjectModalOpen((isOpen) => !isOpen)
            }
            style={{ display: "inline", textAlign: "start" }}
          >
            <PlusOutlined />
          </Button>
        )}
        {projectList && projectList.length > 0 && (
          <Button
            color="default"
            variant="link"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            style={{ display: "inline", textAlign: "start" }}
          >
            {isOpen ? <DownOutlined /> : <RightOutlined />}
          </Button>
        )}
      </Flex>
      {isOpen && (
        <Flex gap="small" vertical className="py-3 px-5 relative">
          {projectList &&
            projectList.length &&
            projectList.map((project) => (
              <Flex className="cursor-pointer"  justify="space-between" key={project.id}>
                <p onClick={() => navigate(`/project/${project.id}`)}><span style={{ color: getColorCode(project.color),fontWeight:"bold" }}># </span> {project.name}</p>
                <ProjectDropdown projectData={project}/>
              </Flex>
            ))}
        </Flex>
      )}
      {addProjectModal && addProjectModal.isProjectModalOpen && (
        <ProjectModal
          isModalOpen={addProjectModal.isProjectModalOpen}
          setIsModalOpen={addProjectModal.setIsProjectModalOpen}
          project={project}
          setProject={setProject}
          addProject={addProject}
        />
      )}
    </Flex>
  );
};

export default ProjectsList;
