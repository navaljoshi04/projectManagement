import React, { useState } from "react";

import { useParams } from "react-router-dom";
import ProjectHeader from "./ProjectHeader";
import Board from "../boardview/Boardview";
import List from "../listview/ListView";
import Timeline from "../timelineview/Timeline";
const Project = () => {
  const { id: projectID } = useParams();
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  return (
    <>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board id={projectID} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={projectID} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline
          id={projectID}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
    </>
  );
};

export default Project;
