import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const getSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      console.log(data.results);
      setsearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex m-auto items-center mt-4 ">
      <i className="ri-search-line text-3xl text-zinc-300 "></i>
      <input
        className="w-[50%] mx-9 p-4 outline-none border-none bg-transparent  text-zinc-200 text-2xl "
        type="text"
        placeholder="search here "
        onChange={(e) => setquery(e.target.value)}
        value={query}
      />
      {query.length > 0 && (
        <i
          className="ri-close-circle-line text-3xl text-zinc-300"
          onClick={() => setquery("")}
        ></i>
      )}

      {/* dropdown */}

      <div className="z-50 dropdown w-[50%] max-h-[50vh] absolute f bg-slate-50 top-[90%] overflow-auto rounded-lg left-20">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className=" w-[100%]  p-7 flex justify-start items-center border-b-2  border-zinc-300 font-semibold text-zinc-500 hover:text-black hover:bg-zinc-300 duration-300"
          >
            <img
              className="w-12 h-12 mr-5 object-cover shadow-lg rounded-md shadow-slate-800"
              src={`https://image.tmdb.org/t/p/original/${s.backdrop_path}`}
              alt=""
            />
            <span>{s.original_title || s.name || s.original_name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
