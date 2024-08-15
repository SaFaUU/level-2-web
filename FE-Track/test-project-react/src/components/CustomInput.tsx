import { forwardRef } from "react";

const CustomInput = forwardRef<HTMLInputElement, { className: string }>(
  ({ className }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        name="name"
        id="name"
        className={className}
      />
    );
  }
);

export default CustomInput;
