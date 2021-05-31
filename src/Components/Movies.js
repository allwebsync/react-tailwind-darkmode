import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        await axios.get("[PRIVATE API LINK, NOT PROVIDED]").then((res) => {
          setMovies(res.data);
        });
      } catch (err) {
      } finally {
        setLoad(false);
      }
    };
    fetch();
  }, []);
  return (
    <div className="flex flex-col mt-16 w-full justify-center">
      <div className="h-10 w-full flex items-center justify-center mt-3">
        <p className="text-2xl font-extrabold">Movies List</p>
      </div>
      {load ? (
        <div
          id="load"
          className="w-auto h-screen flex items-center justify-center -mt-20"
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
        <div className="h-auto w-full bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-items-center p-4 flex-wrap justify-center">
          {movies.map((e) => {
            return (
              <Link
                to={`/movies/${e.id}`}
                className=" w-44 h-72 bg-none m-3 rounded-xl flex flex-col transition duration-500 ease-in-out transform hover:scale-110"
              >
                <div
                  className=" w-full h-52 rounded-xl shadow-2xl"
                  style={{
                    backgroundSize: "cover",
                    objectFit: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${e.image_url})`,
                  }}
                ></div>
                <div className=" rounded-tl-xl rounded-br-xl px-5 py-1 bg-black bg-opacity-50 absolute text-sm font-extralight flex flex-row justify-center items-center">
                  <i
                    className="fa fa-star text-yellow-400 mr-1"
                    aria-hidden="true"
                  ></i>
                  <p className="font-bold shadow-md text-white">{e.rating}</p>
                </div>
                <h1 className="text-xl font-semibold">{e.title}</h1>
                <h2 className="text-sm font-extralight">{e.genre}</h2>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Movies;
