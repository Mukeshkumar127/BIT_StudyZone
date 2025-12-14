import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import serverURl from "../../config.js";
import Spinner from "./Spinner.jsx";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get theme from localStorage
  const theme = localStorage.getItem("theme") || "light";
  const isDark = theme === "dark";

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    setLoading(true);
    await axios
      .post(`${serverURl}/user/login`, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Logged in Successfully");
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
          }, 1000);
        }
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
        setLoading(false);
      });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div
          className={`modal-box ${
            isDark ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Login</h3>

            {/* Email */}
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-80 px-3 py-1 border rounded-md outline-none ${
                  isDark ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-80 px-3 py-1 border rounded-md outline-none ${
                  isDark ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-around m-6">
              <button
                type="submit"
                className={`p-2 rounded flex justify-center items-center ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Sign In"}
              </button>

              <p>
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
