import { SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  label: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  name: string;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
};

const PHInput = ({
  label,
  type = "text",
  size = "small",
  fullWidth,
  name,
  sx,
  required,
}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          sx={{ ...sx }}
          placeholder={label}
          required={required}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default PHInput;
