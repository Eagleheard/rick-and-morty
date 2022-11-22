import axios from "axios";

export const fetchCharactersInfo = () => {
  return axios.get("https://rickandmortyapi.com/api/character");
};
