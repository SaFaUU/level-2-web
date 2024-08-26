import React from "react";
import { useForm } from "react-hook-form";
import cn from "../../utils/cn";
import Button from "../ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name is too long" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(50, { message: "Email is too long" }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(50, { message: "Password is too long" }),
  age: z
    .number()
    .min(1, { message: "Age is required" })
    .max(100, { message: "Age is too high" }),
});

const NormalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "male",
      age: 0,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const double = true;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "border border-gray-300 shadow-sm rounded-lg w-full mx-auto p-5 s",
        {
          "max-w-5xl": double,
          "max-w-md": !double,
        }
      )}
    >
      <div
        className={cn(" grid grid-cols-1 gap-5 justify-items-center", {
          "md:grid-cols-2": double,
          "md:grid-cols-1": !double,
        })}
      >
        <div className="w-full max-w-md">
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="w-full border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="w-full max-w-md">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="w-full border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full max-w-md">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            className="w-full border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="w-full max-w-md">
          <label htmlFor="age" className="block">
            Age
          </label>
          <input
            type="number"
            id="age"
            {...register("age", { required: true })}
            className="w-full border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.age && <p className="text-red-500">Age is required</p>}
        </div>
        <div className="w-full max-w-md">
          <label htmlFor="gender" className="block">
            Gender
          </label>
          <select id="gender" {...register("gender", { required: true })}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500">Gender is required</p>}
        </div>
        <div className="w-full max-w-md">
          <label htmlFor="bio" className="block">
            Bio
          </label>
          <textarea
            id="bio"
            {...register("bio", { required: true })}
            className="w-full border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="w-full max-w-md">
          <label htmlFor="bio" className="block">
            Remember me
          </label>
          <input
            type="checkbox"
            id="remember"
            {...register("remember", { required: true })}
            className=""
          />
        </div>
        <div
          className={cn(
            "w-full grid grid-cols-1 gap-5 justify-items-center max-w-md"
          )}
        >
          <div className="w-full col-start-1 md:col-start-2 flex justify-end">
            <Button className="w-full md:w-fit" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NormalForm;
