import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./tamplates/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./tamplates/Cards";
import Loader from "./tamplates/Loader";

const People = () => {
  const navigate = useNavigate();
  document.title = "Moviee || Poeple";

  // const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [People, setPeople] = useState([]);

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);
      //   console.log(data.results);
      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else sethasMore(false);
    } catch (error) {
      console.log(error);
    }
  };
  const refreshHandler = async () => {
    if (People.length === 0) {
      getPeople();
    } else {
      setpage(1);
      setPeople([]);
      getPeople();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, []);
  return People.length > 0 ? (
    <div className="w-screen h-screen ">
      {/* TopSide */}
      <div className=" px-14 w-full h-[10vh] flex items-center justify-between">
        <h1 className="text-2xl text-zinc-200 font-semibold ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] mr-3 ri-home-7-fill"
          ></i>
          People
        </h1>
        <div className="flex items-center w-[70%]">
          <Topnav />
        </div>
      </div>

      {/* makings cards for trendings  */}
      <InfiniteScroll
        dataLength={People.length}
        next={() => getPeople()}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={People} title="people" />
      </InfiniteScroll>
      <div></div>
    </div>
  ) : (
    <Loader />
  );
};

export default People;
