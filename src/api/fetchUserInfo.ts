import axios from "axios";

export const fetchUserInfo = (email?: string) => {
  return axios.get(`http://localhost:5000/profile/${email}`);
};

export const updateUserInfo = (description?: string, email?: string) => {
  return axios.put(`http://localhost:5000/update/${email}`, {
    description: description,
  });
};
