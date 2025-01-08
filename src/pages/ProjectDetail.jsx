import React, { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import { Button, Flex, List } from "antd";
import { useParams } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask, closeTask } from "../slice/taskSlice";
import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi(import.meta.env.VITE_TODOIST_API_KEY);

const ProjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [projectDetail, setProjectDetail] = useState(null);
  const [addTaskIsOpen, setAddTaskIsOpen] = useState(false);
  const { tasks, isLoading, error, completedTasks } = useSelector(
    (state) => state.tasks
  );

  const [editTaskId, setEditTaskId] = useState(null);
  const [task, setTask] = useState({
    content: "",
    description: "",
    due_date: "",
    priority: 1,
    project_id: id,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProject = await api.getProject(id);
        setProjectDetail(fetchedProject);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    setTask({
      content: "",
      description: "",
      due_date: "",
      priority: 1,
      project_id: id,
    });
    setAddTaskIsOpen(false);
    fetchData(id);
    dispatch(fetchTasks(id));
  }, [id]);

  const handleEditBtn = (task) => {
    setTask({
      content: task.content,
      description: task.description,
      due_date: task.due?.due_date,
      priority: task.priority,
      project_id: task.projectId,
    });
    setAddTaskIsOpen(true);
    setEditTaskId(task.id);
  };

  if (!projectDetail) {
    return <h1>Project not found</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>error{error}</h1>;
  }

  return (
    <Flex gap="middle" vertical className="max-w-[700px] mx-auto">
      <h2 className="text-xl font-bold">{projectDetail.name}</h2>
      {tasks.length > 0 &&
        tasks.map((eachTask) => {
          if (editTaskId === eachTask.id) {
            return (
              <AddTask
                key={eachTask.id}
                projectId={projectDetail.id}
                setAddTaskIsOpen={setAddTaskIsOpen}
                setEditTaskId={setEditTaskId}
                editTaskId={editTaskId}
                localTask={task}
                setLocalTask={setTask}
                isUpdateTask={true}
              />
            );
          }

          return (
            <Flex
              key={eachTask.id}
              gap="small"
              className="border-b-2 py-2 cursor-pointer"
            >
              <div
                onClick={() => dispatch(closeTask(eachTask.id))}
                className="h-5 w-5 border-2 rounded-full group flex justify-center items-center"
              >
                <CheckOutlined className="hidden text-xs text-gray-400 group-hover:inline" />
              </div>
              <Flex vertical>
                <p>{eachTask.content}</p>
                {eachTask.description && <p>{eachTask.description}</p>}
                {eachTask.due && <p>{eachTask.due.date}</p>}
              </Flex>
              <Flex className="ml-auto">
                <Button type="text" onClick={() => handleEditBtn(eachTask)}>
                  <EditOutlined />
                </Button>
                <Button
                  type="text"
                  onClick={() => {
                    dispatch(deleteTask(eachTask.id));
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
          localTask={task}
          setLocalTask={setTask}
          isUpdateTask={false}
        />
      ) : (
        <Button
          color="default"
          variant="link"
          className="flex justify-start px-0"
          onClick={() => setAddTaskIsOpen(!addTaskIsOpen)}
        >
          <div className="flex items-center justify-center bg-orange-600 text-white rounded-full px-[5px] py-[4px] text-md">
            <PlusOutlined />
          </div>
          <span className="text-orange-600 font-semibold">Add task</span>
        </Button>
      )}
      {completedTasks.length > 0 && (
        <List
          size="small"
          dataSource={completedTasks}
          renderItem={(item) => (
            <List.Item className="line-through">
              <Flex gap="small">
                <div className="h-5 w-5 border-2 rounded-full flex justify-center items-center bg-gray-300">
                  <CheckOutlined className="text-xs text-white" />
                </div>
                {item.content}
              </Flex>
            </List.Item>
          )}
        />
      )}
    </Flex>
  );
};

export default ProjectDetail;
