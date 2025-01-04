import React, { useState } from "react";
import { Modal, DatePicker, Input, Select } from "antd";
const { TextArea } = Input;

const TaskModal = ({ isModalOpen, setIsModalOpen }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
    priority: "",
  });

  const handleTextChage = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setTask({ ...task, date: dateString });
  };

  const handleSelectChange = (value) => {
    setTask({ ...task, priority: value });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        closable={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea
          value={task.title}
          placeholder="Read Documents for tue workshop"
          autoSize
          name="title"
          onChange={(e) => handleTextChage(e)}
          className="border-none outline-none focus:outline-none focus:border-0 focus:ring-0 text-lg font-semibold"
        />
        <TextArea
          value={task.description}
          size="small"
          placeholder="Description"
          autoSize
          name="description"
          onChange={(e) => handleTextChage(e)}
          className="border-none outline-none focus:outline-none focus:border-0 focus:ring-0 text-xs"
        />
        <div className="flex space-x-2">
          <DatePicker onChange={onDateChange} />
          <Select
            defaultValue="Priority"
            style={{
              width: 120,
            }}
            onChange={handleSelectChange}
            options={[
              {
                value: "p1",
                label: "Priority 1",
              },
              {
                value: "p2",
                label: "Priority 2",
              },
              {
                value: "p3",
                label: "Priority 3",
              },
              {
                value: "p4",
                label: "Priority 4",
              },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default TaskModal;
