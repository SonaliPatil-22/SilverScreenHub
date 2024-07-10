import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "./tamplates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Dropdown from "./tamplates/Dropdown";
import Topnav from "./tamplates/Topnav";
import Loader from "./tamplates/Loader";

const Movies = () => {
  const navigate = useNavigate();
  document.title = "moviee || Movies";
  const [Category, setCategory] = useState("now_playing");

  const [movies, setmovies] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const getMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${Category}?page=${page}`);
      //   console.log(data.results);
      if (data.results.length > 0) {
        setmovies((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else sethasMore(false);
    } catch (error) {
      console.log(error);
    }
  };
  const refreshHandler = async () => {
    if (movies.length === 0) {
      getMovies();
    } else {
      setpage(1);
      setmovies([]);
      getMovies();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [Category]);
  return movies.length > 0 ? (
    <div className="w-screen h-screen ">
      {/* TopSide */}
      <div className=" px-14 w-full h-[10vh] flex items-center justify-between">
        <h1 className="text-2xl text-zinc-200 font-semibold ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556CD] mr-3 ri-home-7-fill"
          ></i>
          Movies
        </h1>
        <div className="flex items-center w-[70%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "now_playing", "top_rated", "upcoming"]}
            fun={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%] "></div>
        </div>
      </div>

      {/* makings cards for trendings  */}
      <InfiniteScroll
        dataLength={movies.length}
        next={() => getMovies()}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movies} title="movie" />
      </InfiniteScroll>
      <div></div>
    </div>
  ) : (
    <Loader />
  );
};

export default Movies;
