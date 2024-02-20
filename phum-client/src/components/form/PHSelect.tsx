import { Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: undefined | "multiple"
};

const PHSelect = ({ label, name, options, disabled, mode }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem label={label}>
          <Select
          mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </FormItem>
      )}
    />
  );
};

export default PHSelect;
