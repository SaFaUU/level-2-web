import React from "react";
import { useFormContext } from "react-hook-form";

const InputField = () => {
  const { register } = useFormContext();

  return (
    <div>
      <input type="text" {...register("name2")} />
    </div>
  );
};

export default InputField;
