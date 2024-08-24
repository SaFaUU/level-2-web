import React from "react";
import { useForm } from "react-hook-form";
import cn from "../../utils/cn";

const NormalForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const double = true;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("border border-red-500 w-full mx-auto p-5", {
        "max-w-5xl": double,
        "max-w-md": !double,
      })}
    >
      <div
        className={cn(
          "border border-blue-500 grid grid-cols-1 gap-5 justify-items-center",
          {
            "grid-cols-2": double,
            "grid-cols-1": !double,
          }
        )}
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
        </div>
        {/* <label htmlFor="gender">Gender</label>
        <select>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select> */}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default NormalForm;
