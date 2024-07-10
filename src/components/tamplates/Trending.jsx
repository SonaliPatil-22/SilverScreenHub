import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";

const Trending = () => {
  const navigate = useNavigate();
  const [Category, setCategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${Category}/${duration}?page=${page}`
      );
      //   console.log(data.results);
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else sethasMore(false);
    } catch (error) {
      console.log(error);
    }
  };
  const refreshHandler = async () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setpage(1);
      settrending([]);
      getTrending();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [Category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen ">
      {/* TopSide */}
      <div className=" px-14 w-full h-[10vh] flex items-center justify-between">
        <h1 className="text-2xl text-zinc-200 font-semibold ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] mr-3 ri-home-7-fill"
          ></i>
          Trending
        </h1>
        <div className="flex items-center w-[70%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            fun={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%] "></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            fun={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      {/* makings cards for trendings  */}
      <InfiniteScroll
        dataLength={trending.length}
        next={() => getTrending()}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={Category} />
      </InfiniteScroll>
      <div></div>
    </div>
  ) : (
    <Loader></Loader>
  );
};

export default Trending;
