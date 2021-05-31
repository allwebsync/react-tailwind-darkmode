import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
const DetailMovie = () => {
  let { id } = useParams();
  const [load, setLoad] = useState(true);
  const [dataFetch, setDataFetch] = useState([]);
  const [gameplay, setGameplay] = useState("");
  useEffect(() => {
    const fetch = async () => {
      try {
        await axios.get(`[PRIVATE API LINK, NOT PROVIDED]`).then((res) => {
          setDataFetch(res.data);
          let data = res.data;
          if (data.singlePlayer === 1 && data.multiplayer === 1) {
            setGameplay("Single Player & Multiplayer");
          } else if (data.singlePlayer === 1) {
            setGameplay("Single Player");
          } else if (data.multiplayer === 1) {
            setGameplay("Multiplayer");
          } else {
            setGameplay("Unknown");
          }
        });
      } catch (err) {
      } finally {
        setLoad(false);
      }
    };
    fetch();
  }, []);
  return (
    <div className="mt-16 w-full h-full flex justify-center items-center pt-5 lg:p-20">
      {load ? (
        <div
          id="load"
          className="w-auto h-screen flex items-center justify-center -mt-24"
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-20 w-20 text-black dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full h-auto justify-center items-center">
          <div
            className=" w-72 h-96 rounded-xl shadow-2xl"
            style={{
              backgroundSize: "cover",
              objectFit: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${dataFetch.image_url})`,
            }}
          ></div>
          <div className="lg:ml-16 flex flex-col h-full w-72 mt-10 lg:mt-0">
            <h1 className=" text-4xl font-extrabold">{dataFetch.name}</h1>
            <p className=" mt-5 text-md font-semibold">{dataFetch.genre}</p>
            <p className="mt-2 text-sm">Platform : {dataFetch.platform}</p>
            <p className="mt-2 text-sm">Gameplay : {gameplay}</p>
            <p className="mt-2 text-sm">Release Date : {dataFetch.release}</p>
            <Link
              to="/"
              className="mt-10 w-48 px-4 py-3 bg-blue-600 flex justify-center text-white rounded-md lg:mb-0 mb-10"
            >
              Kembali ke Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailMovie;
