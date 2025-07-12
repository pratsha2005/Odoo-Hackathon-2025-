import React, { useState } from "react";
import axios from "axios";
import { loginRoute, registerRoute } from "../api/routes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleLoginAndSignup = async () => {
  try {
    if (currentState === "Login") {
      const res = await axios.post(loginRoute, {
        email: formData.email,
        password: formData.password,
      });
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(res.data.data));
      toast.success(res.data.message);
      navigate("/profile");
    } else {
      const res = await axios.post(registerRoute, formData);
      // Save user data to localStorage (if your backend returns it on signup)
      if (res.data.data) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
      }
      toast.success(res.data.message);
    }
  } catch (err) {
    const msg = err.response?.data?.message || "Something went wrong!";
    toast.error(msg);
    console.error("Auth error:", msg);
  }
};


  const onSubmitHandler = (e) => {
    e.preventDefault();
    handleLoginAndSignup();
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mt-10 mb-2">
          <p className="text-3xl prata-regular">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState !== "Login" && (
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="John Doe"
            required
          />
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="hello@gmail.com"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />

        <div className="flex justify-between w-full text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
          <p
            onClick={() =>
              setCurrentState((prev) => (prev === "Login" ? "Sign Up" : "Login"))
            }
            className="cursor-pointer"
          >
            {currentState === "Login" ? "Create a new account" : "Login here"}
          </p>
        </div>

        <button
          type="submit"
          className="px-8 py-2 mt-4 font-light text-white bg-black"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </>
  );
};

export default Login;
