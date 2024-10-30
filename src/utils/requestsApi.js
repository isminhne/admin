import axios from "../config/axios.js";
import statusCodes from "../utils/statusCodes.js";
import cookies from "../utils/cookies.js";
import pushToast from "../helpers/sonnerToast.js";

const get = async (url, config = {
  headers: {
    "Authorization": `Bearer ${cookies.get("token", { path: "/" })}`
  }
}) => {
  return axios.get(url, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      // pushToast("Lỗi không xác định, vui lòng thử lại sau!", "error");
      const statusCode = error?.response?.status;
      if (statusCode === statusCodes.UNAUTHORIZED) {
        cookies.remove("token", { path: "/" });
        cookies.remove("user");
        pushToast("Bạn cần đăng nhập trước!", "error");
        window.location.reload();
      }
      throw error
      // if (statusCode === statusCodes.NOT_FOUND) {
      //   // pushToast("Lỗi không xác định, vui lòng thử lại sau!", "error");
      //   pushToast(error?.response?.data?.message || "Lỗi không xác định, vui lòng thử lại sau!", "error");
      // }
      //
      // return error?.response?.data;
    });
}

const post = async (url, body = {}, config = {
  headers: {
    "Authorization": `Bearer ${cookies.get("token", { path: "/" })}`
  }
}) => {
  return axios.post(url, body, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      // pushToast("Lỗi không xác định, vui lòng thử lại sau!", "error");
      const statusCode = error?.response?.status;
      if (statusCode === statusCodes.UNAUTHORIZED) {
        cookies.remove("token", { path: "/" });
        cookies.remove("user");
        pushToast("Bạn cần đăng nhập trước!", "error");
        window.location.reload();
      }
      //
      // if (statusCode === statusCodes.NOT_FOUND) {
      //   pushToast("Lỗi không xác định, vui lòng thử lại sau!", "error");
      // }
      // return error?.response?.data;
      throw error
    });
}

const patch = async (url, body = {}, config = {}) => {
  if (!config?.headers) {
    config.headers = {};
  }
  config.headers["Authorization"] = `Bearer ${cookies.get("token", { path: "/" })}`;

  return axios.patch(url, body, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      const statusCode = error?.response?.status;
      if (statusCode === statusCodes.UNAUTHORIZED) {
        cookies.remove("token", { path: "/" });
        cookies.remove("user");
        pushToast("Bạn cần đăng nhập trước!", "error");
        window.location.reload();
      }
      // if (statusCode === statusCodes.NOT_FOUND) {
      //   pushToast("Lỗi không xác định, vui lòng thử lại sau!", "error");
      // }
      throw error
    });
}

const deleteRequest = async (url, config = {
  headers: {
    "Authorization": `Bearer ${cookies.get("token", { path: "/" })}`
  }
}) => {
  return axios.delete(url, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      const statusCode = error?.response?.status;
      if (statusCode === statusCodes.UNAUTHORIZED) {
        cookies.remove("token", { path: "/" });
        cookies.remove("user");
        pushToast("Bạn cần đăng nhập trước!", "error");
        window.location.reload();
      }
      // if (statusCode === statusCodes.NOT_FOUND) {
      //   pushToast("Lỗi không xác định, vui lòng thử lại sau!", "error");
      // }
      throw error
    });
}

const put = async (url, body = {}, config = {
  headers: {
    "Authorization": `Bearer ${cookies.get("token", { path: "/" })}`
  }
}) => {
  return axios.put(url, body, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      const statusCode = error?.response?.status;
      if (statusCode === statusCodes.UNAUTHORIZED) {
        cookies.remove("token", { path: "/" });
        cookies.remove("user");
        pushToast("Bạn cần đăng nhập trước!", "error");
        window.location.reload();
      }
      // if (statusCode === statusCodes.NOT_FOUND) {
      //   pushToast("Lỗi không xác định, vui lòng thử lại sau!", "error");
      // }
      throw error
    });
}

export {
  get,
  post,
  patch,
  deleteRequest,
  put
}