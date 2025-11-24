import React from "react";
import { useGetTasksQuery, useUpdateTaskMutation } from "../api/apiSlice";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];
const Boardview = ({ id, setIsModalNewTaskOpen }) => {
  const { data, isLoading, error } = useGetTasksQuery(id);
  const [updateTask] = useUpdateTaskMutation();
  const moveTask = (id, toStatus) => {
    updateTask({ taskID: id, status: toStatus });
  };

  if (isLoading) return <div>Loading ...</div>;

  if (error) return <div>An error occured while fetching task...</div>;
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
          {taskStatus.map((status) => (
            <Taskcolumn
              key={status}
              status={status}
              tasks={data?.task || []}
              moveTask={moveTask}
              setIsModalNewTaskOpen={setIsModalNewTaskOpen}
            />
          ))}
        </div>
      </DndProvider>
    </>
  );
};

const Taskcolumn = ({ status, tasks, moveTask, setIsModalNewTaskOpen }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => moveTask(item._id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const taskCount = tasks.filter((task) => task.status === status).length;
  const statusColor = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };
  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2  ${
        isOver ? "bg-blue-100 dark:bg-neutral-950 " : ""
      } `}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary ">
          <h3 className="flex  items-center text-lg font-semibold dark:text-white ">
            {" "}
            {status}{" "}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Boardview;
