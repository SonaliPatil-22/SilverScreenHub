// import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/tamplates/Trending";
import Popular from "./components/tamplates/Popular";
import People from "./components/People";
import Movies from "./components/Movies";

import PersonDetails from "./components/PersonDetails";
import MovieDetails from "./components/MovieDetails";
import Trailer from "./components/tamplates/Trailer";
import TvShows from "./components/TvShows";
import TvDetails from "./components/tvDetails";

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/people" element={<People />}></Route>
        <Route path="/people/details/:id" element={<PersonDetails />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/TvShows" element={<TvShows />}></Route>
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />}></Route>
        </Route>

        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route
            path="/movie/details/:id/trailer"
            element={<Trailer />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
