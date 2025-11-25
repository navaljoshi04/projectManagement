import React from "react";
import { useGetTasksQuery, useUpdateTaskMutation } from "../api/apiSlice";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EllipsisVertical, Plus } from "lucide-react";
import { format } from "date-fns";

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
        <div className="flex w-full items-center justify-between whitespace-nowrap rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="text-lg font-semibold dark:text-white truncate max-w-[70%]">
            {status}
          </h3>

          <span
            className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
            style={{ width: "1.5rem", height: "1.5rem" }}
          >
            {taskCount}
          </span>

          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task._id} task={task} />
        ))}
    </div>
  );
};

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { _id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const taskTagSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";

  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const numberOfComments = (task.comments && task.comments.length) || 0;
  const PriorityTag = ({ priority }) => (
    <div
      className={`rounded-full  px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700 "
          : priority === "High"
          ? "bg-yellow-200 text-yellow-700 "
          : priority === "Medium"
          ? "bg-green-200 text-green-700 "
          : priority === "Low"
          ? "bg-blue-200 text-blue-600"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}{" "}
    </div>
  );
  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <img
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between  ">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2 ">
              {taskTagSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 shrink-0 w-4 items-center justify-center dark:text-neutral-500  ">
            <EllipsisVertical size={26} />
          </button>
        </div>
        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white ">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white ">
              {task.points} pts
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Boardview;
