import React from "react";
import { useGetTasksQuery } from "../api/apiSlice";

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];
const Boardview = ({ id, setIsModalNewTaskOpen }) => {
  const { data, isLoading, error } = useGetTasksQuery(id);
  return (
    <>
      <div>boardview</div>
    </>
  );
};

export default Boardview;
