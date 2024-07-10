import { fromJSON } from "postcss";
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";
export { removemovie } from "../reducers/movieSlice";

export const asynchloadmovie = (id) => async (dispatch, getstate) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recomndation = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchprovider = await axios.get(`/movie/${id}/watch/providers`);
    let ultimatedeatils = {
      details: detail.data,
      externalid: externalid.data,
      recomndation: recomndation.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type == "Trailer"),
      watchprovider: watchprovider.data.results.IN,
    };
    dispatch(loadmovie(ultimatedeatils));
    console.log(ultimatedeatils);
  } catch (error) {
    console.log(error);
  }
};
