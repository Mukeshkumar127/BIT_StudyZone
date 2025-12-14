import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../config";
import Spinner from "./Spinner";

function Signup() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const theme = localStorage.getItem("theme") || "light";
  const isDark = theme === "dark";

  const onSubmit = async (data) => {
    setLoading(true);
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post(`${serverUrl}/user/signup`, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate("/");
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
    setLoading(false);
  };
  return (
    <>
      <div
        className={`flex h-screen items-center justify-center ${
          isDark ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className=" w-[500px] ">
          <div
            className={`p-6 rounded-xl shadow-2xl relative ${
              isDark ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg mb-4 mt-4">Signup</h3>
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className={`w-80 px-3 py-1 border rounded-md outline-none ${
                    isDark ? "bg-gray-700 text-white" : "bg-white text-black"
                  }`}
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-80 px-3 py-1 border rounded-md outline-none ${
                    isDark ? "bg-gray-700 text-white" : "bg-white text-black"
                  }`}
                  {...register("email", { required: true })}
                />
                <br />
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
                  type="text"
                  placeholder="Enter your password"
                  className={`w-80 px-3 py-1 border rounded-md outline-none ${
                    isDark ? "bg-gray-700 text-white" : "bg-white text-black"
                  }`}
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Button */}
              <div className="flex justify-around mt-4">
                <div className="flex justify-around m-2">
                  <button
                    type="submit"
                    className={`p-2 rounded flex justify-center items-center ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                    disabled={loading}
                  >
                    {loading ? <Spinner /> : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>
            <div className="text-xl">
              Have account?{" "}
              <button
                className="underline text-blue-500 cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </button>{" "}
              <Login />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
