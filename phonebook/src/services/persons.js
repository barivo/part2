import axios from "axios";
// const baseUrl = "http://localhost:3001/api/persons";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response);
};

const add = (personObj) => {
  return axios.post(baseUrl, personObj).then((response) => response.data);
};

const update = (id, personObj) => {
  return axios
    .put(`${baseUrl}/${id}`, personObj)
    .then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default { getAll, add, update, remove };
