// import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asynchloadmovie, removemovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import HorizontalCards from "./tamplates/HorizontalCards";
import Loader from "./tamplates/Loader";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.movie);
  const Navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asynchloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info && info.details ? (
    <div
      style={{
        background: ` linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-[135vh]  px-14 relative"
    >
      {/*  part 1 navigayion  */}
      <nav className="w-full  text-zinc-200 flex gap-10  text-xl font-bold items-center h-[10vh]">
        <Link
          className=" text-xl ri-arrow-left-s-fill hover:text-[#6556CD]"
          onClick={() => Navigate(-1)}
        ></Link>
        <a target="_blank" href={info.details.homepage}>
          <i
            target="_blank"
            className="ri-home-7-fill  hover:text-[#6556CD]"
          ></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          {" "}
          <i className="ri-earth-fill  hover:text-[#6556CD]"></i>
        </a>
        <a
          href={`http://www.imdb.com/title/${info.externalid.imdb_id}`}
          className=" hover:text-[#6556CD]"
        >
          Imdb
        </a>
      </nav>
      {/* part 2 posters and details */}
      <div className=" w-full flex ">
        <img
          className="h-[60vh] object-cover shadow-lg shadow-black rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${info.details.poster_path}`}
          alt=""
        />
        <div className="  ml-7">
          <h1 className="text-white font-bold text-5xl">
            {info.details.original_title ||
              info.details.title ||
              info.details.original_name ||
              ""}
          </h1>

          <div className=" flex items-center gap-4 mt-4 text-white text-2xl">
            <span className="bg-orange-400 w-12 h-12 rounded-full  bottom-24 text-white font-semibold flex justify-center items-center  ">
              {(info.details.vote_average * 10).toFixed()}
              <small>%</small>
            </span>
            <h1>{info.details.release_date}</h1>
            <h1>{info.details.runtime}min</h1>
          </div>
          <h1 className="text-zinc-200 mt-2 text-2xl">
            {info.details.overview}
          </h1>

          {/* genres */}
          <div className="genres flex gap-2 items-center mb-6  ">
            {info.details.genres.map((g, i) => (
              <div
                className=" bg-white mt-5  bg-opacity-15 backdrop-blur-sm  rounded-md "
                key={i}
              >
                <div className="  text-white p-1 px-2 text-lg font-semibold">
                  {g.name}
                </div>
              </div>
            ))}
          </div>
          {/* button watch trailer */}
          <Link
            to={`${pathname}/trailer`}
            className="bg-[#6556CD]   p-2  rounded-lg  text-white"
          >
            <i className="ri-play-mini-fill"></i>
            Watch Trailer
          </Link>
        </div>
      </div>

      {/* part 3 availabl on platform */}
      <div className=" mt-4 flex gap-3">
        {" "}
        <h1 className="font-semibold text-lg text-white mb-3">
          Available On:
        </h1>{" "}
        {info.watchprovider &&
          info.watchprovider.flatrate &&
          info.watchprovider.flatrate.map((w, i) => (
            <img
              className="w-10 h-10 rounded-md object-cover "
              key={i}
              src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              alt=""
            />
          ))}
      </div>

      {/* recomdations  */}
      <h1 className="text-2xl text-white mt-2">Recomndations :</h1>
      <HorizontalCards
        data={info.recomndation.length > 0 ? info.recomndation : info.similar}
      />
      <Outlet />
    </div>
  ) : (
    <Loader></Loader>
  );
};

export default MovieDetails;
