import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
const DetailMovie = () => {
  let { id } = useParams();
  const [load, setLoad] = useState(true);
  const [dataFetch, setDataFetch] = useState([]);
  const [clampDesc, setClampDesc] = useState(false);
  const [clampRev, setClampRev] = useState(false);
  const [strLength, setStrLength] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        await axios.get(`[PRIVATE API LINK, NOT PROVIDED]`).then((res) => {
          setDataFetch(res.data);
          if (res.data.description.length > 180) {
            setClampDesc(true);
            setStrLength(true);
          } else {
            setClampDesc(false);
            setStrLength(false);
          }
          if (res.data.review.length > 100) {
            setClampRev(true);
            setStrLength(true);
          } else {
            setClampRev(false);
            setStrLength(false);
          }
        });
      } catch (err) {
      } finally {
        setLoad(false);
      }
    };
    fetch();
  }, []);
  const clampHandler = (e) => {
    if (e.target.id == "desc") {
      if (clampDesc === false) {
        setClampDesc(true);
      } else {
        setClampDesc(false);
      }
    } else {
      if (clampRev === false) {
        setClampRev(true);
      } else {
        setClampRev(false);
      }
    }
  };
  return (
    <div className="mt-16 w-full h-full flex justify-center items-center pt-5 lg:p-20">
      {load ? (
        <div
          id="load"
          className="w-auto h-screen flex items-center justify-center ml-7 -mt-28"
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
            <h1 className=" text-4xl font-extrabold">
              {dataFetch.title} ({dataFetch.year})
            </h1>
            <p className=" mt-5 text-sm font-semibold">{dataFetch.genre}</p>
            <p className="mt-2 text-xs">
              Rating :
              <i
                className="fa fa-star text-yellow-400 mr-1 ml-2"
                aria-hidden="true"
              ></i>
              {dataFetch.rating}
            </p>
            <p
              className={
                clampDesc ? "line-clamp-5 mt-4 text-sm" : "mt-4 text-sm"
              }
            >
              Description : <br />
              {dataFetch.description}
              <br />
            </p>
            {clampDesc ? (
              <span
                className="underline text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
                onClick={clampHandler}
                id="desc"
              >
                See More
              </span>
            ) : strLength ? (
              <span
                className="underline text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
                onClick={clampHandler}
                id="desc"
              >
                See Less
              </span>
            ) : (
              <span></span>
            )}
            <p
              className={
                clampRev
                  ? "line-clamp-5 mt-4 text-sm w-72"
                  : "line-clamp-none mt-4 text-sm w-72"
              }
            >
              Review : {dataFetch.review}
            </p>
            {clampRev ? (
              <span
                className="underline text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
                onClick={clampHandler}
                id="review"
              >
                See More
              </span>
            ) : strLength ? (
              <span
                className="underline text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
                onClick={clampHandler}
                id="review"
              >
                See Less
              </span>
            ) : (
              <span></span>
            )}
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
