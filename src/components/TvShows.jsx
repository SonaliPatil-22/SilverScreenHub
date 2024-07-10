import React from "react";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "./tamplates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Dropdown from "./tamplates/Dropdown";
import Topnav from "./tamplates/Topnav";
import Loader from "./tamplates/Loader";

const TvShows = () => {
  const navigate = useNavigate();
  document.title = "moviee || Tvshows";
  const [Category, setCategory] = useState("airing_today");

  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const getTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${Category}?page=${page}`);
      //   console.log(data.results);
      if (data.results.length > 0) {
        settv((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else sethasMore(false);
    } catch (error) {
      console.log(error);
    }
  };
  const refreshHandler = async () => {
    if (tv.length === 0) {
      getTv();
    } else {
      setpage(1);
      settv([]);
      getTv();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [Category]);

  return tv.length > 0 ? (
    <div className="w-screen h-screen ">
      {/* TopSide */}
      <div className=" px-14 w-full h-[10vh] flex items-center justify-between">
        <h1 className="text-2xl text-zinc-200 font-semibold ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] mr-3 ri-home-7-fill"
          ></i>
          Tv Shows
        </h1>
        <div className="flex items-center w-[70%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            fun={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%] "></div>
        </div>
      </div>

      {/* makings cards for trendings  */}
      <InfiniteScroll
        dataLength={tv.length}
        next={() => getTv()}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
      <div></div>
    </div>
  ) : (
    <Loader />
  );
};

export default TvShows;
