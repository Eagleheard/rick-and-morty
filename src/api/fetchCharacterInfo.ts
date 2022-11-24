import axios from "axios";

export const fetchCharacterInfo = (id?: string | number[]) => {
  return axios.get(`https://rickandmortyapi.com/api/character/${id}`);
};
