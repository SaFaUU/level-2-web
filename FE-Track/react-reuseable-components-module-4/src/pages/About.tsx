import React from "react";
import {
  Form,
  FormSection,
  FormSubmit,
  Input,
} from "../components/ReusableForm";
import { FieldValues, useForm } from "react-hook-form";
import InputField from "../components/NormalForm/InputField";
import { z } from "zod";

const About = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TTest>();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const TestSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name is too long" }),
  });

  type TTest = z.infer<typeof TestSchema>;

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} double={true}>
        <FormSection>
          <Input
            type="text"
            label="Name"
            register={register("name")}
            errors={errors}
          />
        </FormSection>
        <FormSubmit></FormSubmit>
      </Form>
    </div>
  );
};

export default About;
