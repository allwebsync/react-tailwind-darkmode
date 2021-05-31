import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("");
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
  const searchHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (name === "input") {
      setSearchInput(value);
    } else if (name === "search") {
      setSearchType(value);
    }
  };
  const searchSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      await axios
        .get("https://backendexample.sanbersy.com/api/data-movie")
        .then((res) => {
          let resMovie = res.data.map((el) => {
            return {
              description: el.description,
              duration: el.duration,
              genre: el.genre,
              image_url: el.image_url,
              rating: el.rating,
              review: el.review,
              title: el.title,
              year: el.year,
            };
          });
          if (searchType === "title") {
            let filteredMovie = resMovie.filter(
              (x) =>
                x.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
            );
            setMovies([...filteredMovie]);
          } else if (searchType === "genre") {
            let filteredMovie = resMovie.filter(
              (x) =>
                x.genre.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
            );
            setMovies([...filteredMovie]);
          } else {
            let inputData = parseInt(searchInput);
            if (isNaN(inputData)) {
              Swal.fire({
                icon: "error",
                text: "Input harus angka!",
              });
            } else {
              let filteredMovie = resMovie.filter(
                (x) => x.rating === inputData
              );
              setMovies([...filteredMovie]);
            }
          }
        });
    } catch (err) {
    } finally {
      setLoad(false);
    }
  };
  const reload = async (e) => {
    e.preventDefault();
    const fetch = async () => {
      try {
        setLoad(true);
        await axios
          .get("https://backendexample.sanbersy.com/api/data-movie")
          .then((res) => {
            setMovies(res.data);
          });
      } catch (err) {
      } finally {
        setLoad(false);
      }
    };
    fetch();
  };
  return (
    <div className="flex flex-col mt-16 w-full justify-center">
      <div className="h-10 w-full flex items-center mt-3">
        <Link
          className="absolute px-3 py-2 bg-blue-600 text-white left-36 text-xs mt-1 rounded-lg"
          to="/"
        >
          Kembali
        </Link>
        <p className="text-2xl font-extrabold m-auto">Movies List</p>
      </div>
      <div className="mt-4 h-10 w-full flex justify-center items-center flex-row">
        <Link
          className="px-3 h-8 py-2 text-white bg-blue-600 text-xs rounded-lg"
          to="/movietable/create"
        >
          Tambah Data
        </Link>
        <form
          onSubmit={searchSubmit}
          className="flex flex-row items-center ml-5"
        >
          <p className="mr-5">Search : </p>
          <input
            type="radio"
            onChange={searchHandler}
            name="search"
            id="title"
            value="title"
          />
          <label className="ml-2 mr-2" htmlFor="title">
            Title
          </label>
          <input
            type="radio"
            placeholder="Genre"
            onChange={searchHandler}
            name="search"
            id="genre"
            value="genre"
          />
          <label className="ml-2 mr-2" htmlFor="genre">
            Genre
          </label>
          <input
            type="radio"
            placeholder="Genre"
            onChange={searchHandler}
            name="search"
            id="rating"
            value="rating"
          />
          <label className="ml-2 mr-2" htmlFor="rating">
            Rating
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-24 py-1 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mt-2 mb-3 ml-2"
            placeholder="Search"
            onChange={searchHandler}
            name="input"
            id="input"
            value={searchInput}
          />
          <button
            className="px-3 h-8 py-2 ml-3 -mt-1 bg-blue-600 text-white text-xs rounded-lg"
            type="submit"
          >
            Cari
          </button>
        </form>
        <button
          className="px-3 h-8 py-2 ml-3 -mt-1 bg-blue-600 text-white text-xs rounded-lg"
          onClick={reload}
        >
          Reload Table
        </button>
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
        <div className="flex flex-col w-5/6 items-center justify-center p-5 m-auto">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="table-fixed">
                  <thead className="dark:bg-gray-800 bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Genre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Duration
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Rating
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Year
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="dark:bg-gray-700 bg-white divide-y divide-gray-200">
                    {movies.map((e) => {
                      return (
                        <tr>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={e.image_url}
                                  alt=""
                                ></img>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium line-clamp-2">
                                  {e.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className=" w-40 text-sm">{e.genre}</td>
                          <td className=" w-40 text-sm line-clamp-1 mt-6">
                            {e.description}
                          </td>
                          <td className=" w-40 text-center text-sm">
                            {e.duration}
                          </td>
                          <td className=" w-40 text-sm text-center">
                            {e.rating}
                          </td>
                          <td className=" w-40 text-sm text-center">
                            {e.year}
                          </td>
                          <td className=" w-20 text-right text-sm font-medium text-center flex items-center justify-center">
                            <Link
                              className="text-blue-500 underline"
                              to={`/movietable/edit/${e.id}`}
                            >
                              Edit
                            </Link>
                            <Link
                              className="text-red-500 underline ml-1"
                              to={`/movietable/delete/${e.id}`}
                            >
                              Delete
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MovieTable;
