import React from "react";
import loader from "/loader.gif";
export const Loader = () => {
  return (
    <div className="flex items-center bg-black justify-center w-screen h-screen ">
      <img className="bg-black " src={loader} alt="" />
    </div>
  );
};
export default Loader;
