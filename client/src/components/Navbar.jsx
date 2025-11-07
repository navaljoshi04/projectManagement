import React from "react";
import { Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black  ">
      <div className="flex items-center  gap-8">
        <div className="flex relative h-min w-[200px]">
          <Search className="absolute left-1 top-1/2 mr-2 h-4 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white "
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center ">
        <Link
          to="/settings"
          className="w-min h-min hover:bg-gray-100 rounded p-2"
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="hidden ml-2 mr-6 min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
