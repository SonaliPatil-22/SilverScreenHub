import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const Navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const video = useSelector((state) => state[category].info.videos);
  console.log(video);

  return (
    <div className="absolute text-white bg-gray-400-50 w-screen h-screen flex items-center  backdrop-blur-sm justify-center z-50 top-0 left-0 bg-opacity-10 ">
      {" "}
      <i
        className="ri-close-fill text-5xl text-zinc-300  absolute top-[8%] right-36 hover:text-[#6556CD]"
        onClick={() => Navigate(-1)}
      ></i>
      {video ? (
        <ReactPlayer
          controls
          height={650}
          width={1100}
          url={`https://www.youtube.com/watch?v=${video.key}`}
        ></ReactPlayer>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
