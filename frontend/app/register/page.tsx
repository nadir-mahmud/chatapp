"use client";
import React, { useState } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [reenterpassword, setReenterPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    if (reenterpassword === password) {
      try {
        console.log("enter!!");
        const res = await axios.post(
          "http://localhost:8080/api/auth/register",
          {
            name,
            email,
            password,
          },
        );
        if (res && res.data.success) {
          toast.success("Succefully registered. Please login!!");
          localStorage.setItem("auth", JSON.stringify(res.data));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    } else {
      console.log(password, reenterpassword);
      toast.error("Password and re-enter password are not same!! ");
    }
  };

  return (
    <div className="w-screen px-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center  "
        style={{ minHeight: "80vh" }}
      >
        <Toaster
          containerStyle={{
            top: 80,
          }}
        />
        <div
          className={
            errors.name ? "w-full  md:w-1/3" : "w-full mb-4   md:w-1/3"
          }
        >
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="block text-red-500 text-sm mt-2 ml-3">
              *Name is required
            </p>
          )}
        </div>

        <div
          className={
            errors.email ? "w-full  md:w-1/3" : "w-full mb-4   md:w-1/3"
          }
        >
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="block text-red-500 text-sm mt-2 ml-3">
              {errors.email.type === "required"
                ? "*Email is required"
                : errors.email.type === "pattern"
                  ? "Invalid email address"
                  : ""}
            </p>
          )}
        </div>

        <div
          className={
            errors.password ? "w-full  md:w-1/3" : "w-full mb-4   md:w-1/3"
          }
        >
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="block text-red-500 text-sm mt-2 ml-3">
              *Password is required
            </p>
          )}
        </div>

        <div
          className={
            errors.reenter ? "w-full  md:w-1/3" : "w-full mb-6   md:w-1/3"
          }
        >
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Re-enter your password
          </label>
          <input
            {...register("reenter", { required: true })}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Re-enter your password"
            onChange={(e) => setReenterPassword(e.target.value)}
          />
          {errors.reenter && (
            <p className="block text-red-500 text-sm my-2 ml-3">
              *Re-enter password is required
            </p>
          )}
        </div>

        <button
          type="submit"
          className=" md:w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
