import React from "react";
import { FieldValues, useForm, FormProvider } from "react-hook-form";
import cn from "../../utils/cn";
import Button from "../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, TNormalForm } from "./validation";
import InputField from "./InputField";

const NormalForm = () => {
  const methods = useForm<TNormalForm>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "male",
      age: 0,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  console.log(watch("name"));

  const double = true;

  return (
    <FormProvider {...methods}>
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
            <InputField />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
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
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
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
          {/* <div className="w-full max-w-md">
            <label htmlFor="age" className="block">
              Age
            </label>
            <input
              type="number"
              id="age"
              {...register("age", { required: true })}
              className="w-full border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500"
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div> */}
          <div className="w-full max-w-md">
            <label htmlFor="gender" className="block">
              Gender
            </label>
            <select id="gender" {...register("gender", { required: true })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">Gender is required</p>
            )}
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
    </FormProvider>
  );
};

export default NormalForm;
