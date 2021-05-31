import React, { useReducer, createContext } from "react";
import Reducer from "./Reducer.js";
let dark = localStorage.getItem("dark");
let status = "";
if (dark == "true") {
  status = true;
} else {
  status = false;
}
let user = JSON.parse(localStorage.getItem("user"));
let currentUser = null;
if (user !== null) {
  currentUser = user;
} else {
  currentUser = null;
}
const initialState = {
  darkMode: status,
  user: currentUser,
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = (props) => {
  const [GlobalState, setGlobalState] = useReducer(Reducer, initialState);
  return (
    <GlobalContext.Provider value={[GlobalState, setGlobalState]}>
      {props.children}
    </GlobalContext.Provider>
  );
};
