import React from "react";

export const Input = ({ label, register, errors, type }) => {
  return (
    <div className="w-full max-w-md">
      <label htmlFor="name" className="block">
        {label}
      </label>
      <input
        type="text"
        id="name"
        {...register}
        className="w-full border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
    </div>
  );
};
