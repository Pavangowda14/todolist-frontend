import React, { useEffect, useState } from "react";
import { Flex, DatePicker, Input, Select, Divider, Button } from "antd";
import dayjs from "dayjs";
import useProjects from "../context/ProjectContext";
import { getColorCode } from "../helper/color";

const { TextArea } = Input;

const AddTask = ({
  projectId,
  setAddTaskIsOpen,
  setEditTaskId,
  localTask,
  updateTask,
  addTask,
  editTaskId,
  setLocalTask,
}) => {
  
  const { projects } = useProjects();


  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setLocalTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onDateChange = (date, dateString) => {
    console.log(dateString)
    setLocalTask((prev) => ({ ...prev, due_date: dateString }));
  };

  const handlePriorityChange = (value) => {
    setLocalTask((prev) => ({ ...prev, priority: value }));
  };

  const handleProjectChange = (value) => {
    setLocalTask((prev) => ({ ...prev, project_id: value }));
  };

  const handleTaskCancelBtn = () => {
    setEditTaskId ? setEditTaskId(null) : setAddTaskIsOpen(false);
    setLocalTask({
      content: "",
      description: "",
      due_date: "",
      priority: 1,
      project_id: projectId,
    });
  };

  const handleTaskAddBtn = () => {
    console.log(localTask)
    if (updateTask) {
      updateTask(editTaskId, localTask);
    } else {
      addTask(projectId, localTask);
    }
    handleTaskCancelBtn();
  };
  console.log(localTask)
  return (
    <Flex gap="medium" vertical className="border-2 rounded-lg p-3">
      <TextArea
        value={localTask.content}
        placeholder="Read Documents for tue workshop"
        autoSize
        name="content"
        onChange={handleTextChange}
        className="border-none outline-none focus:outline-none focus:border-0 focus:ring-0 text-lg font-semibold"
      />
      <TextArea
        value={localTask.description}
        size="small"
        placeholder="Description"
        autoSize
        name="description"
        onChange={handleTextChange}
        className="border-none outline-none focus:outline-none focus:border-0 focus:ring-0 text-xs"
      />
      <div className="flex space-x-2">
        <DatePicker
          value={localTask.due_date ? dayjs(localTask.due?.date) : null}
          onChange={onDateChange}
        />
        <Select
          value={localTask.priority}
          style={{
            width: 120,
          }}
          onChange={handlePriorityChange}
          options={[
            { value: 1, label: "Priority 1" },
            { value: 2, label: "Priority 2" },
            { value: 3, label: "Priority 3" },
            { value: 4, label: "Priority 4" },
          ]}
        />
      </div>
      <Divider />
      <Flex justify="space-between">
        <Select
          value={localTask.project_id}
          style={{
            width: 120,
          }}
          onChange={handleProjectChange}
          options={projects.map((project) => ({
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
          }))}
        />
        <Flex gap="middle">
          <Button
            type="text"
            onClick={handleTaskCancelBtn}
            className="bg-gray-50 border-none hover:bg-gray-200 hover:text-black"
          >
            Cancel
          </Button>
          <Button
            type="text"
            onClick={handleTaskAddBtn}
            className="bg-orange-500 text-white border-none hover:bg-orange-600 hover:text-black"
            disabled={localTask.content.length==0}
          >
            {updateTask ? "Save" : "Add task"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AddTask;