import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../../utils/axios";
import Cards from "./Cards";
import Loader from "./Loader";

const Popular = () => {
  const navigate = useNavigate();
  const [Category, setCategory] = useState("movie");

  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${Category}/popular?page=${page}`);
      //   console.log(data.results);
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else sethasMore(false);
    } catch (error) {
      console.log(error);
    }
  };
  const refreshHandler = async () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setpage(1);
      setpopular([]);
      getPopular();
    }
  };
  useEffect(() => {
    document.title = "Moviee || Popular " + Category;
    refreshHandler();
  }, [Category]);

  return popular ? (
    <div className="w-screen h-screen ">
      {/* TopSide */}
      <div className=" px-14 w-full h-[10vh] flex items-center justify-between">
        <h1 className="text-2xl text-zinc-200 font-semibold ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] mr-3 ri-home-7-fill"
          ></i>
          Popular
        </h1>
        <div className="flex items-center w-[70%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            fun={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%] "></div>
        </div>
      </div>

      {/* makings cards for trendings  */}
      <InfiniteScroll
        dataLength={popular.length}
        next={() => getPopular()}
        hasMore={hasMore}
        // loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={Category} />
      </InfiniteScroll>
      <div></div>
    </div>
  ) : (
    <Loader />
  );
};

export default Popular;
