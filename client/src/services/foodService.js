import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.get("http://localhost:5000/api/food/get/all");
  return data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`http://localhost:5000/api/food/get/${id}`);
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/food/search/${searchTerm}`
  );
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get("http://localhost:5000/api/food/find/tags");
  return data;
};

export const getAllByTag = async (tag) => {
  if (tag === "All") return getAll();
  const { data } = await axios.get(`http://localhost:5000/api/food/tag/${tag}`);
  return data;
};

export async function add(food) {
  const { data } = await axios.post(
    "http://localhost:5000/api/food/create",
    food
  );
  return data;
}

export async function deleteById(foodId) {
  await axios.delete(`http://localhost:5000/api/food/delete/${foodId}`);
}
