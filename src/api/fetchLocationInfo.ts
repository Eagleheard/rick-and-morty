import axios from "axios";

export const fetchLocationInfo = (id?: string) => {
  return axios.get(`https://rickandmortyapi.com/api/location/${id}`);
};
