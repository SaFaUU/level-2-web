import { cn } from "@/lib/utils";
import React from "react";

type TContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: TContainerProps) => {
  return (
    <div className={(cn("w-full max-w-[1230px] px-[20px] mx-auto"), className)}>
      {children}
    </div>
  );
};

export default Container;
