import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { GlobalContext } from "../Global/GlobalState";

const Dashboard = () => {
  const [GlobalState, setGlobalState] = useContext(GlobalContext);
  return (
    <div className="w-52 h-full mt-16 flex flex-col justify-center items-center pl-5">
      <h1 className="mt-5 text-2xl font-bold">Dashboard</h1>
      <div
        className=" w-16 h-16 mt-7 rounded-full shadow-2xl"
        style={{
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundPosition: "center",
          backgroundImage: `url("https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280-300x300.jpg")`,
        }}
      ></div>
      <h1 className="font-bold mt-4">{GlobalState.user.name}</h1>
      <h1 className="font-extralight text-xs mt-1">{GlobalState.user.email}</h1>
      <Link
        className=" mt-5 w-32 flex justify-center py-3 dark:bg-gray-500 bg-white rounded-xl dark:hover:bg-gray-700 hover:bg-gray-400"
        to="/movietable"
      >
        Data Film
      </Link>
      <Link
        className=" mt-5 w-32 flex justify-center py-3 dark:bg-gray-500 bg-white rounded-xl dark:hover:bg-gray-700 hover:bg-gray-400"
        to="/gametable"
      >
        Data Games
      </Link>
      <Link
        className=" mt-5 w-32 flex justify-center py-3 dark:bg-gray-500 bg-white rounded-xl dark:hover:bg-gray-700 hover:bg-gray-400"
        to="/changepass"
      >
        Ganti Password
      </Link>
    </div>
  );
};
export default Dashboard;
