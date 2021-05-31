import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { GlobalContext } from "../Global/GlobalState";
const ChangePassword = () => {
  const history = useHistory();
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [GlobalState, setlobalState] = useContext(GlobalContext);
  let errorStatus = false;
  const onSubmit = async (e) => {
    if (password !== password2) {
      swal.fire({
        text: "Password konfirmasi yang anda masukkan tidak cocok",
        title: "Gagal Mengganti Password",
        icon: "error",
      });
    } else if (current === "" || password === "" || password2 === "") {
      swal.fire({
        text: "Semua form wajib diisi",
        title: "Gagal Mengganti Password",
        icon: "error",
      });
    } else {
      try {
        errorStatus = false;
        swal.fire({
          title: "Sedang memproses",
          icon: "info",
        });
        await axios.post(
          "[PRIVATE API LINK, NOT PROVIDED]",
          {
            current_password: current,
            new_password: password,
            new_confirm_password: password2,
          },
          { headers: { Authorization: "Bearer " + GlobalState.user.token } }
        );
      } catch (err) {
        errorStatus = true;
        let data = JSON.parse(err.response.data);
        swal.fire({
          icon: "error",
          title: "Gagal Mengganti Password",
          text: `Error message : 
          ${data.name || ""}
          ${data.email || ""}
          ${data.password || ""}`,
        });
      } finally {
        if (errorStatus === false) {
          swal.fire({
            icon: "success",
            title: "Berhasil Mengganti Password",
            text: "Mengarahkan anda ke halaman dashboard",
          });
          setTimeout(() => {
            history.push("/");
          }, 100);
        } else {
        }
      }
    }
  };
  const onChange = (e) => {
    let value = e.target.value;
    let id = e.target.id;
    if (id === "password") {
      setPassword(value);
    } else if (id === "password2") {
      setPassword2(value);
    } else {
      setCurrent(value);
    }
  };
  return (
    <div className="h-screen w-full flex bg-gray-200 dark:bg-gray-900  flex-col items-center justify-center">
      <div className=" mt-14 w-auto h-auto px-3 py-3 dark:bg-gray-700 bg-gray-100 flex flex-col rounded-xl items-center">
        <h1 className="font-bold text-3xl mt-3">Change Password</h1>
        <div className="mt-10 w-72 h-auto flex flex-row">
          <div className="w-auto h-auto flex flex-col">
            <label
              className="block dark:text-white text-gray-700 text-sm font-bold mb-2 mt-1 ml-2"
              htmlFor="current"
            >
              Current Password
            </label>
            <label
              className=" block dark:text-white text-gray-700 text-sm font-bold mb-2 ml-2 mt-6"
              htmlFor="password"
            >
              Password
            </label>
            <label
              className=" block dark:text-white text-gray-700 text-sm font-bold mb-2 ml-2 mt-6"
              htmlFor="password"
            >
              Confirm Password
            </label>
          </div>
          <div className="h-auto ml-10 w-40 flex flex-col">
            <input
              onChange={onChange}
              placeholder="********"
              type="password"
              className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
              name="current"
              value={current}
              id="current"
            />
            <input
              onChange={onChange}
              placeholder="********"
              className="mt-6 shadow appearance-none border rounded w-full py-1 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={password}
              id="password"
            />
            <input
              onChange={onChange}
              placeholder="********"
              className="mt-9 shadow appearance-none border rounded w-full py-1 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={password2}
              id="password2"
            />
          </div>
        </div>
        <button
          onClick={onSubmit}
          className="px-4 py-3 outline-none bg-blue-600 active:bg-blue-800 text-white rounded-2xl mt-5"
        >
          Change
        </button>
      </div>
    </div>
  );
};
export default ChangePassword;
