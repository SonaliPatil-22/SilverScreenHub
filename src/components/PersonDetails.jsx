import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asynchloadperson, removeperson } from "../store/actions/personAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import HorizontalCards from "./tamplates/HorizontalCards";
import Loader from "./tamplates/Loader";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.person);
  const Navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asynchloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  console.log(info);

  return info ? (
    <div className=" w-screen py-2 px-10  h-[150vh] bg-[#1F1E24]">
      {/* navigation */}
      <nav className="w-full  text-zinc-200 flex gap-10  text-xl font-bold items-center h-[10vh]">
        <Link
          className=" text-xl ri-arrow-left-s-fill hover:text-[#6556CD]"
          onClick={() => Navigate(-1)}
        ></Link>
      </nav>

      <div className="w-full  flex  ">
        {/* part 2  left poster details */}
        <div className="w-[20%]">
          <img
            className="h-[50vh]  hover:scale-105 object-cover shadow-lg shadow-black rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            alt=""
          />
          <div className="text-3xl text-white flex ml-4 mt-6 gap-7">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              {" "}
              <i className="ri-earth-fill  hover:text-[#6556CD]"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              {" "}
              <i className="ri-facebook-circle-fill  hover:text-[#6556CD]"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              {" "}
              <i className="ri-instagram-line hover:text-[#6556CD]"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill hover:text-[#6556CD]"></i>
            </a>
          </div>
        </div>
        {/* part 3 right side details */}
        <div className="w-[80%] ml-12  ">
          <h1 className="text-white font-bold text-6xl">{info.details.name}</h1>
          <h1 className="text-white text-xl mt-2 ">
            {info.details.biography.slice(0, 1000)}
          </h1>
          <h1 className="text-white mt-5 text-xl font-bold"> Movies : </h1>
          <HorizontalCards data={info.movieCredits.cast} />
          <h1 className="text-white  text-xl font-bold"> Tv Shows : </h1>
          <HorizontalCards data={info.tvCredits.cast} />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default PersonDetails;
