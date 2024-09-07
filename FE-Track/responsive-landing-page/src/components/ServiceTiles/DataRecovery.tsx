import React from "react";
import { motion } from "framer-motion";
import useScrollGrowHook from "@/hooks/useScrollGrowHook";

const DataRecovery = () => {
  const { componentRef, style } = useScrollGrowHook();
  return (
    <motion.div
      ref={componentRef}
      style={style}
      className="bg-red-500 h-[415px] rounded-2xl col-span-6 lg:col-span-7"
    ></motion.div>
  );
};

export default DataRecovery;
