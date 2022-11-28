import axios from "axios";

export const fetchUserInfo = (email?: string) => {
  return axios.get(`http://localhost:5000/api/${email}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

export const updateUserInfo = (description?: string, email?: string) => {
  return axios.put(`http://localhost:5000/api/${email}`, {
    description: description,
  });
};
