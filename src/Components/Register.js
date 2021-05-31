import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { useHistory } from "react-router";
const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  let errorStatus = false;
  const onSubmit = async (e) => {
    if (password !== password2) {
      swal.fire({
        text: "Password konfirmasi yang anda masukkan tidak cocok",
        title: "Gagal Register",
        icon: "error",
      });
    } else if (
      name === "" ||
      email === "" ||
      password === "" ||
      password2 === ""
    ) {
      swal.fire({
        text: "Semua form wajib diisi",
        title: "Gagal Register",
        icon: "error",
      });
    } else {
      try {
        errorStatus = false;
        swal.fire({
          title: "Sedang memproses register",
          icon: "info",
        });
        await axios.post("[PRIVATE API LINK, NOT PROVIDED]", {
          name,
          email,
          password,
        });
      } catch (err) {
        errorStatus = true;

        let data = JSON.parse(err.response.data);

        swal.fire({
          icon: "error",
          title: "Gagal Register",
          text: `Error message : 
          ${data.name || ""}
          ${data.email || ""}
          ${data.password || ""}`,
        });
      } finally {
        if (errorStatus === false) {
          swal.fire({
            icon: "success",
            title: "Berhasil Register",
            text: "Mengarahkan anda ke halaman login",
          });
          setTimeout(() => {
            history.push("/login");
          }, 100);
        } else {
        }
      }
    }
  };
  const onChange = (e) => {
    let value = e.target.value;
    let id = e.target.id;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    } else if (id === "password2") {
      setPassword2(value);
    } else {
      setName(value);
    }
  };
  return (
    <div className="h-screen w-full flex bg-gray-200 dark:bg-gray-900  flex-col items-center justify-center">
      <div className=" mt-14 w-auto h-auto px-3 py-3 dark:bg-gray-700 bg-gray-100 flex flex-col rounded-xl items-center">
        <h1 className="font-bold text-3xl mt-3">Register Page</h1>
        <div className="mt-10 w-72 h-auto flex flex-row">
          <div className="w-auto h-auto flex flex-col">
            <label
              className="block dark:text-white text-gray-700 text-sm font-bold mb-6 ml-2"
              htmlFor="name"
            >
              Nama
            </label>
            <label
              className="block dark:text-white text-gray-700 text-sm font-bold mb-2 mt-1 ml-2"
              htmlFor="email"
            >
              Email
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
              placeholder="admin"
              type="text"
              className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline -mt-1 "
              name="name"
              value={name}
              id="name"
            />
            <input
              onChange={onChange}
              placeholder="admin@example.com"
              type="text"
              className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-5"
              name="email"
              value={email}
              id="email"
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
          Register
        </button>
        <p className="m-5">
          Sudah punya akun?
          <Link className="text-blue-500 underline ml-2" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
