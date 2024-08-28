import React from "react";
import cn from "../../utils/cn";
import { FormElementContext } from ".";

export const FormSection = ({ children }: { children: React.ReactNode }) => {
  const { double } = React.useContext(FormElementContext);
  return (
    <div
      className={cn(" grid grid-cols-1 gap-5 justify-items-center", {
        "md:grid-cols-2": double,
        "md:grid-cols-1": !double,
      })}
    >
      {children}
    </div>
  );
};
