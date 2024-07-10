// import React from "react";
import notfound from "/funny-404.gif";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex  items-center bg-transparent flex-col ">
      <h1 className="text-4xl font-bold text-black  absolute z-50 top-36 shadow-xl shadow-black/20 p-2">
        {" "}
        Trailer Not Found{" "}
      </h1>
      <img
        className="h-[70%] w-[60%]  object-cover rounded-lg relative top-32"
        src={notfound}
        alt=""
      />
    </div>
  );
};

export default NotFound;
