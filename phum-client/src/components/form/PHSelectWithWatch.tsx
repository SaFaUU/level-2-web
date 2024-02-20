import { Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: undefined | "multiple"
  onValueChange: (value: string) => void
};

const PHSelectWithWatch = ({ label, name, options, disabled, mode, onValueChange }: TPHSelectProps) => {

  const {control} = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  })

  React.useEffect(() => {
    onValueChange(inputValue)
  }, [inputValue])

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

export default PHSelectWithWatch;
