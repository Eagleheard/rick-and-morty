import axios from "axios";

import { IUser } from "types/interfaces";

export const registration = (params: IUser) => {
  return axios.post(
    `https://rick-and-morty-server-gzy5.vercel.app/api/signup`,
    params,
    {
      withCredentials: true,
    }
  );
};

export const login = (params?: IUser) => {
  return axios.post(
    `https://rick-and-morty-server-gzy5.vercel.app/api/login`,
    params,
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  );
};

export const authorization = () => {
  return axios.get(`https://rick-and-morty-server-gzy5.vercel.app/api/auth`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};
