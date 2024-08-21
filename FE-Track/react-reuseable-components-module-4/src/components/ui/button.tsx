import React from "react";
import cn from "../../utils/cn";

const button = ({ variant, className }) => {
  const getVariant = (variant) => {
    switch (variant) {
      case "outline":
        return "btn-outline";
      case "ghost":
        return "btn-ghost";
      default:
        return "btn-solid";
    }
  };
  return (
    <button className={cn("btn", getVariant(variant), className)}>CLick</button>
  );
};

export default button;
