import React, { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import { Button, Flex } from "antd";
import { useParams } from "react-router-dom";
import { TodoistApi } from "@doist/todoist-api-typescript";
import useTasks from "../context/TaskContext";
import TaskList from "../components/TaskList";
import {EditOutlined, DeleteOutlined,PlusOutlined,CheckOutlined} from "@ant-design/icons"

const api = new TodoistApi("a16d266303c18f963a53ff4e13fa2e4304250c47");

const ProjectDetail = () => {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState(null);
  const [addTaskIsOpen, setAddTaskIsOpen] = useState(false);
  const { fetchTask, tasks, isLoading, addTask, deleteTask, updateTask, closeTask } = useTasks();
  const [editTaskId, setEditTaskId] = useState(null);
  const [task, setTask] = useState({
    content: "",
    description: "",
    due_date: "",
    priority: 1,
    project_id: id,
  });

  useEffect(() => {
    api
      .getProject(id)
      .then((project) => {
        console.log(project);
        setProjectDetail(project);
      })
      .catch((error) => console.log(error));
    setTask({
      content: "",
      description: "",
      due_date: "",
      priority: 1,
      project_id: id,
    })
    setAddTaskIsOpen(false);
  }, [id]);

  useEffect(() => {
    fetchTask(id);
  }, [id]);

  const handleEditBtn = (task) => {
    console.log("Editing task:", task);
    setTask({
      content: task.content,
      description: task.description,
      due_date: task.due?.due_date,
      priority: task.priority,
      project_id: task.project_id,
    });
    setAddTaskIsOpen(true);
    setEditTaskId(task.id);
  };

  if (!projectDetail) {
    return <h1>Project not found</h1>;
  }

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <Flex gap="middle" vertical className="max-w-[700px] mx-auto">
      <h2 className="text-xl font-bold">{projectDetail.name}</h2>
      {tasks.length > 0 &&
  tasks.map((task) => {
    if (editTaskId === task.id) {
      return (
        <AddTask
          key={task.id}
          projectId={projectDetail.id}
          setAddTaskIsOpen={setAddTaskIsOpen}
          setEditTaskId={setEditTaskId}
          editTaskId={editTaskId}
          task={task}
          setTask={setTask}
          updateTask={updateTask}
        />
      );
    }

    return (
      <Flex key={task.id} gap="small" className="border-b-2 py-2 cursor-pointer">
        <div onClick={()=>closeTask(task.id)} className="h-5 w-5 border-2 rounded-full group flex justify-center items-center"><CheckOutlined className="hidden text-xs text-gray-400 group-hover:inline"/></div>
        <Flex vertical>
          <p>{task.content}</p>
          {task.description && <p>{task.description}</p>}
          {task.due && <p>{task.due.date}</p>}
        </Flex>
        <Flex className="ml-auto">
          <Button  type="text" onClick={() => handleEditBtn(task)}><EditOutlined /></Button>
          <Button
          type="text"
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            <DeleteOutlined />
          </Button>
        </Flex>
      </Flex>
    );
  })}

      {!editTaskId && addTaskIsOpen ? (
        <AddTask
          projectId={projectDetail.id}
          setAddTaskIsOpen={setAddTaskIsOpen}
          task={task}
          setTask={setTask}
          addTask={addTask}
        />
      ) : (
        <Button
          color="default"
          variant="link"
          className="flex justify-start px-0"
          onClick={() => setAddTaskIsOpen(!addTaskIsOpen)}
          
        >
          <div className="flex items-center justify-center bg-orange-600 text-white rounded-full px-[5px] py-[4px] text-md"><PlusOutlined /></div>
          <span className="text-orange-600 font-semibold">Add task</span>
        </Button>
      )}
    </Flex>
  );
};

export default ProjectDetail;
