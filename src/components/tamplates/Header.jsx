/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  console.log(data);
  return (
    <div
      className="w-full h-[50vh] flex flex-col justify-end p-12  items-start"
      style={{
        background: ` linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.poster_path || data.profile_path || ""
        })`,
        backgroundPosition: "",
        backgroundSize: "cover",
      }}
    >
      <h1 className=" w-[70%] text-5xl text-white font-black ">
        {data.original_title || data.name || data.original_name}
      </h1>
      <p className="text-zinc-100 w-[70%] ">
        {data.overview.slice(0, 200)}
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          ....more
        </Link>
      </p>
      <p className="text-white  mt-4 flex gap-2">
        <i className="ri-calendar-todo-line text-orange-300 "></i>
        {data.release_date || data.first_air_date}
        <i className="ri-clapperboard-fill ml-2 text-orange-300"></i>{" "}
        {data.media_type}
      </p>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="bg-[#6556CD]  p-2  rounded-lg mt-4 text-white"
      >
        <i className="ri-play-mini-fill"></i>
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
