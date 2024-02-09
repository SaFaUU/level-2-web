import { Form } from "antd";
import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
  defaultValues?: FieldValues;
} & TFormConfig;

const PHForm = ({ onSubmit, children, defaultValues }: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm<TFormProps>(formConfig);

  return (
    <FormProvider {...methods}>
      <Form onFinish={methods.handleSubmit(onSubmit)} layout="vertical">
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
