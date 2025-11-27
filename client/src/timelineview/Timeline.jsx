import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../api/apiSlice";

const Timeline = ({ id, setIsModalNewTaskOpen }) => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const { data, isLoading, error } = useGetTasksQuery({ projectID: id });
  if (isLoading) return <div>Loading ...</div>;

  if (error) return <div>An error occured while fetching task...</div>;
  const [displayOptions, setDisplayOptions] = useState({
    view: "Month",
    locale: "en-US",
    showWeekends: true,
    zoom: "normal",
  });
  const tasks = data?.task || [];
  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate),
        end: new Date(task.duedate),
        name: task.title,
        id: `Task-${task._id}`,
        type: "task",
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);
  return <div>Timeline</div>;
};



export default Timeline;
