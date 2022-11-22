import axios from "axios";

export const fetchCharactersInfo = (page: number) => {
  return axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
};
