import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="sidebar w-[20%] h-full border-r-2  border-zinc-300 p-10 overflow-y-auto">
      <h1 className="text-2xl text-white font-bold mt-2 ml-4">
        <i className=" text-[#6556CD]  ri-tv-fill mr-1 "></i>
        <span>Moviee</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3 ">
        <h1 className="font-semibold text-white   text-xl mt-10 mb-5">
          New Feed
        </h1>
        <hr />
        <Link
          to={"/trending"}
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg  text-xl p-5 "
        >
          <i className=" mr-2 ri-fire-fill"></i>
          Trending
        </Link>
        <Link
          to={"/popular"}
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg  text-xl p-5 "
        >
          <i className=" mr-2 ri-bard-fill"></i>
          Popular
        </Link>
        <Link
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg  text-xl p-5 "
          to={"/movie"}
        >
          <i className=" mr-2 ri-movie-2-fill"></i>
          Movies
        </Link>
        <Link
          to={"/TvShows"}
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg  text-xl p-5 "
        >
          <i className=" mr-2 ri-movie-fill"></i>
          Tv Shows
        </Link>
        <Link
          to={"/people"}
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg  text-xl p-5 "
        >
          <i className=" mr-2 ri-user-heart-fill"></i>
          People
        </Link>
      </nav>
      <hr />
      <nav className="flex flex-col text-zinc-400 text-xl gap-3 ">
        <h1 className="font-semibold text-white   text-xl mt-10 mb-5">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg  text-xl p-5 ">
          <i className=" mr-2 ri-home-heart-fill"></i>
          About
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg  text-xl p-5 ">
          <i className=" mr-2 ri-phone-fill"></i>
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
