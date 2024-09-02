import React from "react";
import { motion } from "framer-motion";

const parent = {
  intitial: {
    // rotate: 0,
    opacity: 0.0,
    scale: 0.9,
  },
  animate: {
    // rotate: 360,
    opacity: 1.0,
    // scale: 1.1,/
    transition: {
      ease: "easeInOut",
      duration: 2,
      // repeat: Infinity,
      // repeatType: "reverse",
      delayChildren: 1,
      staggerChildren: 0.5,
    },
  },
};

const child = {
  intitial: {
    // rotate: 0,
    opacity: 0.0,
    // scale: 0.9,
  },
  animate: {
    // rotate: 360,
    opacity: 1.0,
    scale: 1.1,
  },
};

const Lessor1 = () => {
  return (
    <div className="h-screen flex items-center justify-center align-middle p-4 gap-10">
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg flex items-center justify-center align-middle p-4 gap-2"
        variants={parent}
        initial="intitial"
        animate="animate"
      >
        <motion.div
          className="size-10 bg-red-500 rounded-lg"
          variants={child}
        ></motion.div>
        <motion.div
          className="size-10 bg-red-500 rounded-lg"
          variants={child}
        ></motion.div>
        <motion.div
          className="size-10 bg-red-500 rounded-lg"
          variants={child}
        ></motion.div>
        <motion.div
          className="size-10 bg-red-500 rounded-lg"
          variants={child}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default Lessor1;