import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-[1220px] mx-auto flex justify-between items-center px-[20px]">
      {children}
    </div>
  );
};

export default Container;
