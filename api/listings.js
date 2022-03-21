import client from "./client";
import mime from "mime";

const getListings = (endpoint) => client.get(endpoint);

const addListings = (endpoint, listings, config) => {
  const newImageUri = "file:///" + listings.image.split("file:/").join("");
  const data = new FormData();
  data.append("name", listings.name);
  data.append("brand", listings.brand.id);
  data.append("category", listings.category.id);
  data.append("size", listings.size.id);
  data.append("color", listings.color.id);
  data.append("stock", listings.stock);
  data.append("originalPrice", listings.originalPrice);
  data.append("type", listings.type.id);
  data.append("image", {
    name: newImageUri.split("/").pop(),
    type: mime.getType(newImageUri),
    uri: newImageUri,
  });

  return client.post(endpoint, data, config);
};

const updateListings = (endpoint, data, config) => {
  return client.put(endpoint, data, config, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const updateImage = (endpoint, image, config) => {
  const newImageUri = "file:///" + image.image.split("file:/").join("");
  const data = new FormData();
  data.append("image", {
    name: newImageUri.split("/").pop(),
    type: mime.getType(newImageUri),
    uri: newImageUri,
  });
  return client.put(endpoint, data, config);
};

const deleteListings = (endpoint, id, params, config) =>
  client.delete(`${endpoint}/${id}`, params, config);

export default {
  addListings,
  deleteListings,
  getListings,
  updateListings,
  updateImage,
};
