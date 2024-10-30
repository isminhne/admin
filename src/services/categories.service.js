import pushToast from "../helpers/sonnerToast.js";
import {deleteRequest, get, post, put} from "../utils/requestsApi.js";

const getAllCategories = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
  search = null,
}) => {
  try {
    const res = await get('/categories', {
      params: {
        page,
        limit,
        sortBy,
        order,
        search,
      }
    });
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

const deleteCategory = async (id) => {
  try {
    const res = await deleteRequest(`/categories/${id}`);
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

const createCategory = async ({
  title,
  description,
  parent = null,
  thumbnail
}) => {
  try {
    const res = await post('/categories', {
      title,
      description,
      parent,
      thumbnail
    });
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

const getCategory = async (id) => {
  try {
    const res = await get(`/categories/${id}`);
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

const updateCategory = async ({
  id,
  title,
  description,
  thumbnail,
  parent
}) => {
  try {
    const res = await put(`/categories/${id}`, {
      title,
      description,
      thumbnail,
      parent
    });
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

export default {
  getAllCategories,
  deleteCategory,
  createCategory,
  getCategory,
  updateCategory
}