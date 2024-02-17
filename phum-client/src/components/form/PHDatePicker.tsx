import { DatePicker, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import { Controller } from "react-hook-form";

type TDatePPickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TDatePPickerProps) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <FormItem label={label}>
            <DatePicker {...field} size="large" style={{ width: "100%" }} />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
