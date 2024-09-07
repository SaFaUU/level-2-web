import useScrollGrowHook from "@/hooks/useScrollGrowHook";
import { useScroll, motion, useTransform } from "framer-motion";
import React from "react";

const BatteryReplacement = () => {
  const { componentRef, style } = useScrollGrowHook();
  return (
    <motion.div
      style={style}
      ref={componentRef}
      className="bg-red-500 h-[415px] rounded-2xl col-span-12"
    ></motion.div>
  );
};

export default BatteryReplacement;
