import React from "react";
import { motion } from "framer-motion";

const parent = {
  intitial: {
    // rotate: 0,
    opacity: 0.0,
    scale: 0.9,
  },
  animate: {
    x: [0, 300, -300, 0],
    y: 100,
    // rotate: 360,
    opacity: 1.0,
    // scale: 1.1,/
    transition: {
      opacity: {
        ease: "easeInOut",
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        delayChildren: 1,
        staggerChildren: 0.5,
      },
      ease: "easeInOut",
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      delayChildren: 1,
      staggerChildren: 0.5,
    },
  },
};

const Keyframe = () => {
  const parentRef = React.useRef(null);
  return (
    <div
      ref={parentRef}
      className=" flex items-center justify-center align-middle p-4 gap-10 size-[500px] border border-red-500 mx-auto my-auto"
    >
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg flex items-center justify-center align-middle p-4 gap-2"
        variants={parent}
        initial="intitial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
        drag
        dragConstraints={parentRef}
        whileDrag={{ scale: 1.1, boxShadow: "10px 10px 10px rgba(0,0,0,0.5)" }}
      ></motion.div>
    </div>
  );
};

export default Keyframe;
