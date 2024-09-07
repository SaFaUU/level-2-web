import useScrollGrowHook from "@/hooks/useScrollGrowHook";
import React from "react";
import { motion } from "framer-motion";

const ChipsetReplacement = () => {
  const { componentRef, style } = useScrollGrowHook();
  return (
    <motion.div
      ref={componentRef}
      style={style}
      className="bg-red-500 h-[415px] rounded-2xl col-span-6 lg:col-span-5"
    ></motion.div>
  );
};

export default ChipsetReplacement;
