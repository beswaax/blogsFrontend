import axios from "axios";
const baseUrl = "https://warm-castle-09064.herokuapp.com/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log(response.data);
  return response.data;
};

export default {
  login,
};
