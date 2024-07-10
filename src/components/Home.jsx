import React, { useEffect, useState } from "react";
import Sidenav from "./tamplates/Sidenav";
import Topnav from "./tamplates/Topnav";
import axios from "../utils/axios";
import Header from "./tamplates/Header";
import HorizontalCards from "./tamplates/HorizontalCards";
import Dropdown from "./tamplates/Dropdown";
import Loader from "./tamplates/Loader";

const Home = () => {
  document.title = "scdb  | Home";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [categories, setcategories] = useState("all");

  const getWallpaper = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      //   console.log(data.results);
      const randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      //   console.log(randomData);
      setwallpaper(randomData);
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(wallpaper);

  //    calling the trending movies in the cards

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${categories}/day`);
      //   console.log(data.results);
      settrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !wallpaper && getWallpaper();
    getTrending();
  }, [categories]);
  // console.log(categories);
  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="topnav w-[80%] h-full overflow-auto overflow-x-hidden  ">
        <Topnav />
        <Header data={wallpaper} />
        <div className=" text-3xl font-semibold flex justify-between  p-5 text-zinc-300">
          <h1>Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            fun={(e) => setcategories(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} title={categories} />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Home;
