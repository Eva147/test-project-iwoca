import axios, { AxiosResponse } from "axios";
import { AppType } from "../types/application.type";

export const getApp = (
  page: number,
  limit: number
): Promise<AppType[]> => {
  const url = `http://localhost:3001/api/applications?_page=${page}&_limit=${limit}`;

  return axios
    .get(url)
    .then((res: AxiosResponse<AppType[]>) => res.data)
    .catch((error) => {
      if (error.response) {
        console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
        throw new Error(`Failed to fetch apps: ${error.response.status}`);
      } else if (error.request) {
        console.error('Network Error: No response received');
        throw new Error('Network error: Unable to reach server');
      } else {
        console.error('Error:', error.message);
        throw new Error(`Request failed: ${error.message}`);
      }
    });
};
