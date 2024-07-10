import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full  flex  overflow-y-hidden h-[40vh] mb-5 p-3">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type}/details/${c.id}`}
          className="min-w-[15%] h-full mr-5 rounded-md bg-white  bg-opacity-10  mb-5 backdrop-blur-sm p-2"
          key={i}
        >
          <img
            className="w-full h-[55%] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.poster_path || c.profile_path || ""
            }`}
            alt=""
          />
          <div className=" p-3 h-[45%] overflow-y-auto overflow-x-hidden ">
            <h1 className=" text-xl text-white font-semibold ">
              {c.original_title || c.name || c.original_name}
            </h1>
            <p className="text-zinc-100 ">
              {c.overview.slice(0, 30)}
              <Link className="text-zinc-400">....more</Link>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;
