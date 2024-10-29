import pushToast from "../helpers/sonnerToast.js";
import {deleteRequest, get, post} from "../utils/requestsApi.js";


const getAllProducts = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
  search = null,
}) => {
  try {
    const res = await get('/products', {
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

const deleteProduct = async (id) => {
  try {
    const res = await deleteRequest(`/products/${id}`);
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

const getCategories = async ({
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

const createProduct = async ({
  title,
  description,
  price,
  count,
  images,
  category
}) => {
  try {
    const res = await post('/products', {
      title,
      description,
      price,
      count,
      images,
      category
    });
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

export default {
  getAllProducts,
  deleteProduct,
  getCategories,
  createProduct
}