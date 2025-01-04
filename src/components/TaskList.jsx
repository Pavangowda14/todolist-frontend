import React from "react";
import AddTask from "../components/AddTask";
import { Button, Flex } from "antd";
import useTasks from "../context/TaskContext";

const TaskList = ({
  tasks,
  projectId,
  setTask,
  setAddTaskIsOpen,
  setEditTaskId,
  handleEditBtn,
  editTaskId,
}) => {
    
    const { deleteTask, updateTask } = useTasks();
  return (
    <Flex vertical>
      {tasks.length > 0 &&
        tasks.map((task) => {
          return editTaskId == task.id ? (
            <AddTask
              key={editTaskId ? `edit-${editTaskId}` : "add-task"}
              projectId={projectId}
              setAddTaskIsOpen={setAddTaskIsOpen}
              setEditTaskId={setEditTaskId}
              task={task}
              setTask={setTask}
              updateTask={updateTask}
            />
          ) : (
            <Flex key={task.id} gap="small" className="border-b-2 py-2">
              <div className="h-5 w-5 border-2 rounded-full"></div>
              <Flex vertical>
                <p>{task.content}</p>
                {task.description && <p>{task.description}</p>}
                {task.due && <p>{task.due.date}</p>}
              </Flex>
              <Flex className="ml-auto">
                <Button onClick={() => handleEditBtn(task)}>E</Button>
                <Button
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                >
                  D
                </Button>
              </Flex>
            </Flex>
          );
        })}
    </Flex>
  );
};

export default TaskList;
