import React from "react";
import { Modal, Input, Select, Divider, Flex, Switch, Button } from "antd";
import colors from "../helper/color";
import { useDispatch } from "react-redux";
import { addProject, updateProject } from "../slice/projectSlice";
import { useUserContext } from "../context/userContext";

const ProjectModal = ({
  isModalOpen,
  setIsModalOpen,
  project,
  setProject,
  isUpdateProject,
}) => {
  const dispatch = useDispatch();
  const handleTextChage = (e) => {
    setProject({ ...project, project_name: e.target.value });
  };

  const {user}=useUserContext()
  const handleSelectChange = (value) => {
    setProject({ ...project, color: value });
  };

  const handleOk = () => {
    if (isUpdateProject) {
      dispatch(updateProject({ projectId: project.id, newProject: project }));
    } else {
      dispatch(addProject(project));
      setProject({
        project_name: "",
        color: "charcoal",
        is_favorite: false,
        user_id:user.id
      });
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSwitchChange = (checked) => {
    setProject({ ...project, is_favorite: checked });
  };
  const options = colors.map((color) => ({
    value: color.code,
    label: (
      <Flex align="center" gap="small">
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: color.code,
          }}
        ></div>
        <span>{color.label}</span>
      </Flex>
    ),
  }));

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Add Project"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            className="bg-gray-50 border-none hover:bg-gray-200 hover:text-black"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            className="bg-orange-500 text-white border-none hover:bg-orange-600 hover:text-black"
          >
            {addProject ? "Add" : "Save"}
          </Button>,
        ]}
      >
        <Divider />
        <Flex gap="large" vertical>
          <Flex gap="small" vertical>
            <label className="font-bold">Name</label>
            <Input
              showCount
              maxLength={120}
              value={project.project_name}
              onChange={handleTextChage}
            />
          </Flex>
          <Flex gap="small" vertical>
            <label className="font-bold">Color</label>
            <Select
              className="w-full"
              defaultValue={project.color}
              onChange={handleSelectChange}
              options={options}
            />
          </Flex>
          <Flex gap="small" align="center">
            <Switch value={project.is_favorite} onChange={onSwitchChange} />
            <label className="text-lg">Add to favorites</label>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default ProjectModal;
