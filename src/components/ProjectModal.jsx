import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Divider, Flex, Switch, Button } from "antd";
import colors from "../helper/color";

const ProjectModal = ({
  isModalOpen,
  setIsModalOpen,
  project,
  setProject,
  addProject,
  updateProject,
}) => {
  const handleTextChage = (e) => {
    setProject({ ...project, name: e.target.value });
  };

  const handleSelectChange = (value) => {
    setProject({ ...project, color: value });
  };

  const handleOk = () => {
    if (addProject) {
      addProject(project);
      setProject({
        name: "",
        color: "charcoal",
        isFavorite: false,
      });
    } else {
      updateProject(project.id, {
        name: project.name,
        color: project.color,
        isFavorite: project.isFavorite,
      });
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSwitchChange = (checked) => {
    setProject({ ...project, isFavorite: checked });
  };
  const options = colors.map((color) => ({
    value: color.value,
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
          <Button key="back" onClick={handleCancel}  className="bg-gray-50 border-none hover:bg-gray-200 hover:text-black">
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} className="bg-orange-500 text-white border-none hover:bg-orange-600 hover:text-black">
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
              value={project.name}
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
            <Switch value={project.isFavorite} onChange={onSwitchChange} />
            <label className="text-lg">Add to favorites</label>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default ProjectModal;
