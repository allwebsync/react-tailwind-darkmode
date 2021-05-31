import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { GlobalContext } from "../Global/GlobalState";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [GlobalState, setGlobalState] = useContext(GlobalContext);
  let errorStatus = false;
  const onSubmit = async (e) => {
    if (email === "" || password === "") {
      swal.fire({
        text: "Semua form wajib diisi",
        title: "Gagal Login",
        icon: "error",
      });
    } else {
      try {
        errorStatus = false;
        swal.fire({
          text: "Sedang memproses login",
          icon: "info",
        });
        await axios
          .post("[PRIVATE API LINK, NOT PROVIDED]", {
            email,
            password,
          })
          .then((res) => {
            let user = res.data.user;
            let token = res.data.token;
            let currentUser = { name: user.name, email: user.email, token };
            setGlobalState({ type: "setUser", payload: currentUser });
            localStorage.setItem("user", JSON.stringify(currentUser));
          });
      } catch (err) {
        errorStatus = true;
        swal.fire({
          icon: "error",
          title: "Gagal Login",
          text: `Error message : Email atau password salah`,
        });
      } finally {
        if (errorStatus === false) {
          swal.fire({
            icon: "success",
            title: "Berhasil Login",
            text: "Mengarahkan anda ke dashboard",
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
    if (id === "username") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  return (
    <div className="h-screen w-full flex bg-gray-200 dark:bg-gray-900  flex-col items-center justify-center">
      <div className="w-auto h-auto px-3 py-3 dark:bg-gray-700 bg-gray-100 flex flex-col rounded-xl items-center">
        <h1 className="font-bold text-3xl mt-3">Login Page</h1>
        <div className="mt-10 w-72 h-24 flex flex-row">
          <div className="w-auto h-auto flex flex-col">
            <label
              className="block dark:text-white text-gray-700 text-sm font-bold my-1 ml-2"
              htmlFor="username"
            >
              Email
            </label>
            <label
              className=" block dark:text-white text-gray-700 text-sm font-bold mb-2 ml-2 mt-7"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="h-auto ml-10 w-40 flex flex-col">
            <input
              onChange={onChange}
              placeholder="admin@example.com"
              type="text"
              className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              name="username"
              value={email}
              id="username"
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
          </div>
        </div>
        <button
          onClick={onSubmit}
          className="px-4 py-3 outline-none bg-blue-600 active:bg-blue-800 text-white rounded-2xl"
        >
          Login
        </button>
        <p className="m-5">
          Belum punya akun?{" "}
          <Link className="text-blue-500 underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
