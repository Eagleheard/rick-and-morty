import axios from "axios";

import { IUser } from "types/interfaces";

export const registration = (params: IUser) => {
  return axios.post(
    `https://rick-and-morty-server-gzy5.vercel.app/register`,
    params,
    {
      withCredentials: true,
    }
  );
};

export const login = (params?: IUser) => {
  return axios.post(
    `https://rick-and-morty-server-gzy5.vercel.app/login`,
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
  return axios.get(`https://rick-and-morty-server-gzy5.vercel.app/auth`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

export const logout = () => {
  return axios.put("https://rick-and-morty-server-gzy5.vercel.app/logout");
};
