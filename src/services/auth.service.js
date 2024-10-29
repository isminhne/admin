import cookies from "../utils/cookies.js";
import pushToast from "../helpers/sonnerToast.js";
import {post} from "../utils/requestsApi.js";

const login = async (data) => {
  try {
    const res = await post('/auth/login', data);
    cookies.set("token", res.token, {path: "/"});
    cookies.set("email", res.email, {path: "/"});
    pushToast("Đăng nhập thành công!", "success");
    return res;
  } catch (e) {
    cookies.remove("token", { path: "/" });
    cookies.remove("email", { path: "/" });
    pushToast(e.response.data.message, "error");
  }
}

const register = async (data) => {
  try {
    const res = await post('/auth/register', data);
    // cookies.set("token", res.metadata.token, {path: "/"});
    // cookies.set("user", JSON.stringify(await getUser()));
    console.log(res);
    return res;
  } catch (e) {
    pushToast("Lỗi khi đăng ký!", "error");
  }
}

const logout = () => {
  cookies.remove("token", { path: "/" });
  cookies.remove("email", { path: "/" });
  pushToast("Đăng xuất thành công!", "success");
}

export default {
  login,
  register,
  logout
}