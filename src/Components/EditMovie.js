import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { GlobalContext } from "../Global/GlobalState";
import Swal from "sweetalert2";
const EditMovie = () => {
  const [GlobalState, setGlobalState] = useContext(GlobalContext);
  let { id } = useParams();
  const [load, setLoad] = useState(true);
  const [dataFetch, setDataFetch] = useState({});
  let errorStatus = false;
  const history = useHistory();
  useEffect(() => {
    const fetch = async () => {
      try {
        await axios.get(`[PRIVATE API LINK, NOT PROVIDED]`).then((res) => {
          setDataFetch(res.data);
        });
      } catch (err) {
      } finally {
        setLoad(false);
      }
    };
    fetch();
  }, []);
  const onChange = (e) => {
    let idtarget = e.target.id;
    let value = e.target.value;
    if (idtarget === "title") {
      setDataFetch({ ...dataFetch, title: value });
    } else if (idtarget === "description") {
      setDataFetch({ ...dataFetch, description: value });
    } else if (idtarget === "duration") {
      setDataFetch({ ...dataFetch, duration: value });
    } else if (idtarget === "genre") {
      setDataFetch({ ...dataFetch, genre: value });
    } else if (idtarget === "image_url") {
      setDataFetch({ ...dataFetch, image_url: value });
    } else if (idtarget === "rating") {
      setDataFetch({ ...dataFetch, rating: value });
    } else if (idtarget === "review") {
      setDataFetch({ ...dataFetch, review: value });
    } else if (idtarget === "year") {
      setDataFetch({ ...dataFetch, year: value });
    } else {
    }
  };
  const onSubmit = async () => {
    try {
      Swal.fire({
        icon: "info",
        title: "Sedang memproses data",
      });
      await axios.put(
        `https://backendexample.sanbersy.com/api/data-movie/${id}`,
        dataFetch,
        { headers: { Authorization: "Bearer " + GlobalState.user.token } }
      );
    } catch (err) {
      errorStatus = true;
      Swal.fire({
        icon: "error",
        title: "Gagal Mengubah data",
      });
    } finally {
      if (errorStatus !== true) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengubah data",
        });
        history.push("/movietable");
      }
    }
  };
  return (
    <div className="mt-16 w-full h-full flex justify-center items-center pt-5 lg:p-20">
      {load ? (
        <div
          id="load"
          className="w-auto h-full flex items-center justify-center ml-7 -mt-28"
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
          <div className="h-full w-full flex bg-gray-200 dark:bg-gray-900  flex-col items-center justify-center">
            <div className=" mt-14 w-auto h-auto px-3 py-3 dark:bg-gray-700 bg-gray-100 flex flex-col rounded-xl items-center mb-10">
              <h1 className="font-bold text-3xl mt-3">Edit Movie</h1>
              <div className="mt-10 w-72 h-auto flex flex-row">
                <div className="w-auto h-auto flex flex-col">
                  <label
                    className="block dark:text-white text-gray-700 text-sm font-bold mb-2 mt-1 ml-2"
                    htmlFor="title"
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
                    className=" block dark:text-white text-gray-700 text-sm font-bold mb-2 ml-2 mt-6"
                    htmlFor="description"
                  >
                    Desctiprion
                  </label>
                  <label
                    className=" block dark:text-white text-gray-700 text-sm font-bold mb-2 ml-2 mt-6"
                    htmlFor="duration"
                  >
                    Duration
                  </label>
                  <label
                    className=" block dark:text-white text-gray-700 text-sm font-bold mb-2 ml-2 mt-6"
                    htmlFor="rating"
                  >
                    Rating
                  </label>
                  <label
                    className=" block dark:text-white text-gray-700 text-sm font-bold mb-2 ml-2 mt-6"
                    htmlFor="review"
                  >
                    Review
                  </label>
                  <label
                    className=" block dark:text-white text-gray-700 text-sm font-bold mb-2 ml-2 mt-6"
                    htmlFor="year"
                  >
                    Year
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
                    name="title"
                    value={dataFetch.title}
                    id="title"
                  />
                  <input
                    onChange={onChange}
                    type="text"
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
                    name="genre"
                    value={dataFetch.genre}
                    id="genre"
                  />
                  <textarea
                    onChange={onChange}
                    type="text"
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
                    name="description"
                    value={dataFetch.description}
                    id="description"
                  />
                  <input
                    onChange={onChange}
                    type="number"
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
                    name="duration"
                    value={dataFetch.duration}
                    id="duration"
                  />
                  <input
                    onChange={onChange}
                    type="number"
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
                    max="10"
                    name="rating"
                    value={dataFetch.rating}
                    id="rating"
                  />
                  <textarea
                    onChange={onChange}
                    type="text"
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
                    name="review"
                    value={dataFetch.review}
                    id="review"
                  />
                  <input
                    onChange={onChange}
                    type="number"
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3"
                    min="1980"
                    max="2021"
                    name="year"
                    value={dataFetch.year}
                    id="year"
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
                Edit
              </button>
              <Link
                className="px-4 py-3 outline-none bg-blue-600 active:bg-blue-800 text-white rounded-2xl mt-5"
                to="/movietable"
              >
                Kembali
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditMovie;
