import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../Global/GlobalState";
import { useEffect } from "react";
const Nav = () => {
  let dark = localStorage.getItem("dark");
  const [GlobalState, setGlobalState] = useContext(GlobalContext);
  useEffect(() => {
    if (dark === "true") {
      setGlobalState({ type: "setDark", payload: true });
      localStorage.setItem("dark", true);
      document.getElementsByTagName("html")[0].classList.add("dark");
    } else {
      setGlobalState({ type: "setDark", payload: false });
      localStorage.setItem("dark", false);
      document.getElementsByTagName("html")[0].classList.remove("dark");
    }
  }, []);
  const darkSwitch = () => {
    if (dark === "true") {
      setGlobalState({ type: "setDark", payload: false });
      localStorage.setItem("dark", false);
      document.getElementsByTagName("html")[0].classList.remove("dark");
    } else {
      setGlobalState({ type: "setDark", payload: true });
      localStorage.setItem("dark", true);
      document.getElementsByTagName("html")[0].classList.add("dark");
    }
  };
  return (
    <div className="fixed z-50 top-0 h-16 w-full transition duration-500 bg-white dark:bg-gray-900 border-b-2 border-solid dark:border-white border-gray-300 flex flex-row items-center">
      <NavLink
        activeClassName="font-bold"
        className="ml-4 flex flex-row"
        to="/"
      >
        <i class="fa fa-2x fa-video-camera" aria-hidden="true"></i>
        <h1 className=" mt-1 ml-4 font-extrabold">Aria Film</h1>
      </NavLink>
      <ul className=" absolute top-2 right-2 flex flex-row w-72 h-11 justify-center items-center">
        <li>
          <NavLink
            activeClassName="font-bold border-b-2 border-solid border-blue-500"
            className=" transition duration-500 h-full w-full p-1 ml-1 mr-1"
            to="/movies"
          >
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="font-bold border-b-2 border-solid border-blue-500"
            className=" transition duration-500 h-full w-full p-1 ml-1"
            to="/games"
          >
            Games
          </NavLink>
        </li>
        <li>
          {GlobalState.user !== null ? (
            <NavLink
              activeClassName="font-bold border-b-2 border-solid border-blue-500"
              className=" transition duration-500 h-full w-full p-1 ml-1"
              to="/logout"
            >
              Log Out
            </NavLink>
          ) : (
            <NavLink
              activeClassName="font-bold border-b-2 border-solid border-blue-500"
              className=" transition duration-500 h-full w-full p-1 ml-1"
              to="/login"
            >
              Login
            </NavLink>
          )}
        </li>
        <div
          onClick={darkSwitch}
          className=" transition duration-500 ml-4 h-5 w-9 dark:bg-gray-200 bg-gray-600 rounded-full flex items-center"
        >
          <div
            className={
              GlobalState.darkMode
                ? "ml-5 h-3 w-3 rounded-full dark:bg-gray-900 transition duration-500"
                : "ml-1 h-3 w-3 rounded-full bg-white transition duration-500"
            }
          ></div>
        </div>
      </ul>
    </div>
  );
};
export default Nav;
