import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className=" flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`flex  w-full bg-gray-50 dark:bg-dark-bg md:pl-64 flex-col`}
      >
        <Navbar />
      </main>
    </div>
  );
};

export default Dashboard;
