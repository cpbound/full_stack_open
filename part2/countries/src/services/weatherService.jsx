import axios from "axios";
const baseUrl = `https://api.openweathermap.org/data/2.5/`;

const APIKey = import.meta.env.VITE_API_KEY;

const get = (country) => {
  return axios.get(
    `${baseUrl}weather?q=${country}&appid=${APIKey}&units=metric`
  );
};

export default {
  get: get,
};
