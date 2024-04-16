import React from "react";

type TContainerProps = {
  children: React.ReactNode;
};
const Container = ({ children }: TContainerProps) => {
  return <div className=" h-screen w-full max-w-7xl mx-auto">{children}</div>;
};

export default Container;
