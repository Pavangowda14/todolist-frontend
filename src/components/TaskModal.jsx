import React, { useState } from "react";
import useProjects from "../context/ProjectContext";
import { Modal, DatePicker, Input, Select, Flex, Button, Divider } from "antd";
const { TextArea } = Input;
import { getColorCode } from "../helper/color";
import useTasks from "../context/TaskContext";
import { useParams } from "react-router-dom";

const TaskModal = ({ isModalOpen, setIsModalOpen }) => {
  const [task, setTask] = useState({
    content: "",
    description: "",
    due_date: "",
    priority: 1,
    project_id: "",
  });

  const { id } = useParams();

  const { projects } = useProjects();
  const { addTask } = useTasks();

  const handleProjectChange = (value) => {
    setTask((prev) => ({ ...prev, project_id: value }));
  };

  const handleTextChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onDateChange = (date, dateString) => {
    setTask({ ...task, due_date: dateString });
  };

  const handleSelectChange = (value) => {
    setTask({ ...task, priority: value });
  };

  const handleOk = () => {
    addTask(id, task);
    setIsModalOpen(false);
    resetTaskState();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetTaskState();
  };

  const resetTaskState = () => {
    setTask({
      content: "",
      description: "",
      due_date: "",
      priority: 1,
      project_id: "",
    });
  };

  const projectOptions = projects.map((project) => ({
    value: project.id,
    label: (
      <div>
        <span
          style={{
            color: getColorCode(project.color),
            fontWeight: "bold",
          }}
        >
          #{" "}
        </span>
        {project.name}
      </div>
    ),
  }));

  return (
    <>
      <Modal
        open={isModalOpen}
        closable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Flex justify="space-between" key="footer">
            <Select
              placeholder="Select project"
              style={{
                width: 150,
              }}
              value={task.project_id || undefined}
              onChange={handleProjectChange}
              options={projectOptions}
            />
            <div>
              <Button
                key="back"
                type="text"
                onClick={handleCancel}
                className="bg-gray-50 border-none hover:bg-gray-200 hover:text-black"
              >
                Cancel
              </Button>
              <Button
                key="submit"
                type="text"
                disabled={task.content.length == 0 || task.project_id == ""}
                className="bg-orange-500 text-white border-none hover:bg-orange-600 hover:text-black"
                onClick={handleOk}
              >
                Add Task
              </Button>
            </div>
          </Flex>,
        ]}
      >
        <TextArea
          value={task.content}
          placeholder="Task Content"
          autoSize
          name="content"
          onChange={handleTextChange}
          className="border-none outline-none focus:outline-none focus:border-0 focus:ring-0 text-lg font-semibold"
        />
        <TextArea
          value={task.description}
          placeholder="Task description"
          autoSize
          name="description"
          onChange={handleTextChange}
          className="border-none outline-none focus:outline-none focus:border-0 focus:ring-0 text-xs"
        />
        <div className="flex space-x-2">
          <DatePicker placeholder="Due date" onChange={onDateChange} />
          <Select
            placeholder="Priority"
            style={{
              width: 150,
            }}
            value={task.priority || undefined}
            onChange={handleSelectChange}
            options={[
              { value: 1, label: "Priority 1" },
              { value: 2, label: "Priority 2" },
              { value: 3, label: "Priority 3" },
              { value: 4, label: "Priority 4" },
            ]}
          />
        </div>
        <Divider />
      </Modal>
    </>
  );
};

export default TaskModal;
