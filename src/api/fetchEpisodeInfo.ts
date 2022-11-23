import axios from "axios";

export const fetchEpisodeInfo = (episodeNumber: string) => {
  return axios.get(episodeNumber);
};
