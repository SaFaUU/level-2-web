import React from "react";
import { motion } from "framer-motion";

const parent = {
  intitial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
  },
};

const Lessor1 = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg"
        variants={parent}
        initial="intitial"
        animate="animate"
        transition={{
          type: "spring",
          duration: 2,
        }}
      ></motion.div>
    </div>
  );
};

export default Lessor1;
