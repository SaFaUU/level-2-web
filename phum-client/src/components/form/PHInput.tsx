import { Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const PHInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <FormItem label={label}>
            <Input type={type} id={name} {...field} size="large" disabled={disabled} />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PHInput;
