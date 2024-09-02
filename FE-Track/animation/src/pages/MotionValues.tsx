import { motion, motionValue, useTransform } from "framer-motion";
import React, { useEffect } from "react";

const MotionValues = () => {
  const x = motionValue(0);
  const opacity = useTransform(x, [0, 100], [1, 0]);

  return (
    <div className="border boreder-red-500 size-[500px] flex flex-col justify-center items-center">
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg flex flex-wrap gap-5"
        style={{ x, opacity }}
        drag="x"
      ></motion.div>
    </div>
  );
};

export default MotionValues;
