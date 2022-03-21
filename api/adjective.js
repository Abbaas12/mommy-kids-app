import client from "./client";
import cache from "../utility/cache";

//create item
const addItem = (apiEndpoint, data, config) =>
  client.post(apiEndpoint, data, config);

//get item
const getItem = (apiEndpoint) => client.get(apiEndpoint);

//delete item
const deleteItem = (apiEndpoint, id, params, config) =>
  client.delete(`${apiEndpoint}/${id}`, params, config);

//Edit item
const editItem = (apiEndpoint, data, config) =>
  client.put(apiEndpoint, data, config);

export default {
  addItem,
  getItem,
  deleteItem,
  editItem,
};
