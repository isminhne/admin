import './Login.css';
import {useEffect} from "react";
import AuthService from "../../services/auth.service.js";
import {useForm} from "react-hook-form";
import {isEmpty} from "lodash/lang.js";
import pushToast from "../../helpers/sonnerToast.js";
import {useNavigate} from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: undefined,
    criteriaMode: "firstError",
  });

  const onSubmit = async (data) => {
    const res = await AuthService.login(data);
    if (!isEmpty(res)) {
      navigate("/");
    }
  };

  const onError = (errors, e) => {
    Object.values(errors).forEach((error) => {
      pushToast(error.message, "error");
    });
  }

  return (
    <div className="login-form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input
            placeholder="Enter email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
        </div>
        <div className="input-container">
          <input
            placeholder="Enter password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />

          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round"
                    strokeLinecap="round"></path>
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
        </div>
        <button className="submit" type="submit">
          Sign in
        </button>

        {/*<p className="signup-link">*/}
        {/*  No account?*/}
        {/*  <a href="">Sign up</a>*/}
        {/*</p>*/}
      </form>
    </div>
  )
}