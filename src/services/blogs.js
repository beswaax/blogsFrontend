import axios from "axios";
const baseUrl = "https://warm-castle-09064.herokuapp.com/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const create = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

const update = async (blog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog);

  return response.data;
};

const remove = async (id, token) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export default { getAll, create, update, remove };
