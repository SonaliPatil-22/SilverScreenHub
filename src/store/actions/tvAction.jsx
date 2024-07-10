import { fromJSON } from "postcss";
import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";
export { removetv } from "../reducers/tvSlice";

export const asynchloadtv = (id) => async (dispatch, getstate) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recomndation = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchprovider = await axios.get(`/tv/${id}/watch/providers`);
    let ultimatedeatils = {
      details: detail.data,
      externalid: externalid.data,
      recomndation: recomndation.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type == "Trailer"),
      watchprovider: watchprovider.data.results.IN,
    };
    dispatch(loadtv(ultimatedeatils));
    console.log(ultimatedeatils);
  } catch (error) {
    console.log(error);
  }
};
