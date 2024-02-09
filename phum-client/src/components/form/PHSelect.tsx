import { Select, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";

const PHSelect = ({ label }) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <FormItem label={label}>
      <Select
        style={{ width: "100%" }}
        onChange={handleChange}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
    </FormItem>
  );
};

export default PHSelect;
