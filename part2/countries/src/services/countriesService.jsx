import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const get = () => {
  return axios.get(`${baseUrl}/all`);
};

export default {
  get: get,
};
