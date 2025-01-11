import React, { useState } from "react";
import { Button, Flex } from "antd";
import ProjectModal from "./ProjectModal";
import { PlusOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
import { getColorCode } from "../helper/color";
import ProjectDropdown from "./ProjectDropdown";
import { useNavigate } from "react-router-dom";

const ProjectsList = ({ title, addProjectModal, projectList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState({
    name: "",
    color: "charcoal",
    isFavorite: false,
  });
  const navigate = useNavigate();

  return (
    <Flex vertical>
      <Flex>
        <Button
          color="default"
          variant="link"
          style={{ display: "inline", textAlign: "start", flexGrow: 1 }}
          onClick={() => navigate("/")}
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
              <Flex
                className="cursor-pointer"
                justify="space-between"
                key={project.id}
              >
                <p onClick={() => navigate(`/project/${project.id}`)}>
                  <span
                    style={{
                      color: getColorCode(project.color),
                      fontWeight: "bold",
                    }}
                  >
                    #{" "}
                  </span>{" "}
                  {project.name}
                </p>
                <ProjectDropdown projectData={project} />
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
          isUpdateProject={false}
        />
      )}
    </Flex>
  );
};

export default ProjectsList;
