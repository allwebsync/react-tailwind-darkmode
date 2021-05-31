import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { GlobalContext } from "../Global/GlobalState";
const CreateGame = () => {
  const [GlobalState, setGlobalState] = useContext(GlobalContext);
  const [dataFetch, setDataFetch] = useState({});
  let errorStatus = false;
  let history = useHistory();
  const onChange = (e) => {
    let idtarget = e.target.id;
    let value = e.target.value;
    let nametarget = e.target.name;
    if (idtarget === "name") {
      setDataFetch({ ...dataFetch, name: value });
    } else if (nametarget === "gameplay") {
      if (value === "single") {
        setDataFetch({ ...dataFetch, singlePlayer: 1, multiplayer: 0 });
      } else if (value === "multi") {
        setDataFetch({ ...dataFetch, singlePlayer: 0, multiplayer: 1 });
      } else {
        setDataFetch({ ...dataFetch, singlePlayer: 1, multiplayer: 1 });
      }
    } else if (idtarget === "genre") {
      setDataFetch({ ...dataFetch, genre: value });
    } else if (idtarget === "image_url") {
      setDataFetch({ ...dataFetch, image_url: value });
    } else if (idtarget === "platform") {
      setDataFetch({ ...dataFetch, platform: value });
    } else if (idtarget === "release") {
      setDataFetch({ ...dataFetch, release: value });
    } else {
    }
  };
  const onSubmit = async () => {
    try {
      Swal.fire({
        icon: "info",
        title: "Sedang memproses data",
      });
      await axios.post(`[PRIVATE API LINK, NOT PROVIDED]`, dataFetch, {
        headers: { Authorization: "Bearer " + GlobalState.user.token },
      });
    } catch (err) {
      errorStatus = true;
      Swal.fire({
        icon: "error",
        title: "Gagal Menambah data",
      });
    } finally {
      if (errorStatus !== true) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambah data",
        });
        history.push("/gametable");
      }
    }
  };
  return (
    <div className="mt-16 w-full h-full flex justify-center items-center pt-5 lg:p-20">
      <div className="flex flex-col lg:flex-row w-full h-auto justify-center items-center">
        <div className="h-full w-full flex bg-gray-200 dark:bg-gray-900  flex-col items-center justify-center">
          <div className=" mt-14 w-auto h-auto px-3 py-3 dark:bg-gray-700 bg-gray-100 flex flex-col rounded-xl items-center mb-10">
            <h1 className="font-bold text-3xl mt-3">Edit Game</h1>
            <div className="w-full h-auto flex flex-row">
              <div className="w-auto h-auto flex flex-col">
                <label
                  className="block dark:text-white text-gray-700 text-sm font-bold mb-2 mt-1 ml-2"
                  htmlFor="name"
                >
                  Title
                </label>
                <label
                  className=" block dark:text-white text-gray-700 text-sm font-bold mb-2 ml-2 mt-6"
                  htmlFor="genre"
                >
                  Genre
                </label>
                <label
                  className=" block dark:text-white text-gray-700 text-sm font-bold mb-11 ml-2 mt-16"
                  htmlFor="singlePlayer"
                >
                  Gameplay
                </label>
                <label
                  className=" block dark:text-white text-gray-700 text-sm font-bold mb-3 ml-2"
                  htmlFor="platform"
                >
                  Platform
                </label>
                <label
                  className=" block dark:text-white text-gray-700 text-sm font-bold mb-2 ml-2 mt-6"
                  htmlFor="release"
                >
                  Release
                </label>
                <label
                  className=" block dark:text-white text-gray-700 text-sm font-bold mb-2 ml-2 mt-6"
                  htmlFor="image_url"
                >
                  Image Url
                </label>
              </div>
              <div className="h-auto ml-10 w-40 flex flex-col">
                <input
                  onChange={onChange}
                  type="text"
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
                  name="name"
                  value={dataFetch.name}
                  id="name"
                />
                <input
                  onChange={onChange}
                  type="text"
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
                  name="genre"
                  value={dataFetch.genre}
                  id="genre"
                />
                <div>
                  <input
                    onChange={onChange}
                    type="radio"
                    className="mr-1"
                    name="gameplay"
                    value="multi"
                    id="multiplayer"
                  />
                  <label htmlFor="multiplayer">Multiplayer</label>
                  <br />
                  <input
                    onChange={onChange}
                    type="radio"
                    className="mr-1"
                    name="gameplay"
                    value="single"
                    id="singleplayer"
                  />
                  <label htmlFor="singleplayer">Single Player</label>
                  <br />
                  <input
                    onChange={onChange}
                    type="radio"
                    className="mr-1"
                    name="gameplay"
                    value="singlemulti"
                    id="singlemulti"
                  />
                  <label htmlFor="singlemulti">
                    Single Player & Multiplayer
                  </label>
                </div>
                <textarea
                  onChange={onChange}
                  type="text"
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
                  name="platform"
                  value={dataFetch.platform}
                  id="platform"
                />
                <input
                  onChange={onChange}
                  type="number"
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
                  name="release"
                  value={dataFetch.release}
                  id="release"
                />
                <textarea
                  onChange={onChange}
                  type="text"
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
                  name="image_url"
                  value={dataFetch.image_url}
                  id="image_url"
                />
              </div>
            </div>
            <button
              onClick={onSubmit}
              className="px-4 py-3 outline-none bg-blue-600 active:bg-blue-800 text-white rounded-2xl mt-5"
            >
              Tambah Data
            </button>
            <Link
              className="px-4 py-3 outline-none bg-blue-600 active:bg-blue-800 text-white rounded-2xl mt-5"
              to="/gametable"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateGame;
