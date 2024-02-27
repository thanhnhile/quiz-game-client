import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true,
});

export const get = async (path: string, options = {}) => {
  const response = await request.get(path, options);
  return response?.data;
};

export const post = async (path: string, payload: any) => {
  const response = await request.post(path, payload);
  return response?.data;
};

export const deleteRequest = async (path: string) => {
  const response = await request.delete(path);
  return response?.data;
};

export const put = async (path: string, payload: any) => {
  const response = await request.put(path, payload);
  return response?.data;
};
