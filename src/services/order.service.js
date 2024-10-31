import {deleteRequest, get, patch, put} from "../utils/requestsApi.js";
import pushToast from "../helpers/sonnerToast.js";

const getOrders = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
}) => {
  try {
    const res = await get('/orders', {
      params: {
        page,
        limit,
        sortBy,
        order
      }
    });
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

const deleteOrder = async (id) => {
  try {
    const res = await deleteRequest(`/orders/${id}`);
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

const getOrder = async (id) => {
  try {
    const res = await get(`/orders/${id}`);
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

const updateOrder = async ({
  id,
  status
}) => {
  try {
    const res = await patch(`/orders/${id}`, {
      status
    });
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

export default {
  getOrders,
  deleteOrder,
  updateOrder,
  getOrder
}