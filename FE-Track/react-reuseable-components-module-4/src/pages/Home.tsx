import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import cn from "../utils/cn";

const Home = () => {
  return (
    <div>
      <button
        className={cn(
          "btn btn-primary",
          {
            "btn-disabled": false,
            "btn-success": true,
          },
          "btn-warning"
        )}
      >
        {" "}
        Home{" "}
      </button>
    </div>
  );
};

export default Home;
