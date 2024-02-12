import { Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const PHSelect = ({ label, name, options }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <FormItem label={label}>
          <Select style={{ width: "100%" }} {...field} options={options} />
        </FormItem>
      )}
    />
  );
};

export default PHSelect;
