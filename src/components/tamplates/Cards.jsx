import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  // console.log(data);
  return (
    <div className="w-full  flex   flex-wrap  px-5 bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link
          to={`/${data.media_type || title}/details/${c.id}`}
          className="w-[35vh]  mr-3 mb-4 relative "
          key={i}
        >
          <img
            className="h-[40vh] object-cover shadow-lg shadow-black rounded-md hover:scale-105 duration-300"
            src={`https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.poster_path || c.profile_path
            }`}
            alt=""
          />
          <h1 className="text-2xl text-white font-semibold mt-2">
            {" "}
            {c.original_title || c.name || c.original_name}
          </h1>
          {c.vote_average && (
            <div className="bg-[#6556CD] w-8 h-8 rounded-full -right-3 absolute bottom-24 text-white font-semibold flex justify-center items-center ">
              {(c.vote_average * 10).toFixed()}
              <small>%</small>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
