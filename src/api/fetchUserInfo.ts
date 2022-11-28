import axios from "axios";

export const fetchUserInfo = (email?: string) => {
  return axios.get(
    `https://rick-and-morty-server-gzy5.vercel.app/api/${email}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
};

export const updateUserInfo = (description?: string, email?: string) => {
  return axios.put(
    `https://rick-and-morty-server-gzy5.vercel.app/api/${email}`,
    {
      description: description,
    }
  );
};
