import { API_KEY, API_URL } from "./../config/index";
import axios from "axios";
export const fetchWeatherOfCity = async (query: string) => {
  const response = await axios.get(API_URL, {
    params: {
      q: query,
      appid: API_KEY,
      units: "metric",
      lang: "vi",
    },
  });
  return response.data;
};
