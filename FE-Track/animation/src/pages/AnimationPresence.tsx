import { motion, useAnimate, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const AnimationPresence = () => {
  const [visible, setVisible] = useState(true);
  const box = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 1.5 } },
  };

  return (
    <div className="border boreder-red-500 size-[500px] flex flex-col justify-center items-center">
      <AnimatePresence>
        <motion.button
          className="bg-green-500 mb-10 mx-2 py-3"
          onClick={() => setVisible(!visible)}
          layout
        >
          {visible ? "Hide" : "Show"}
        </motion.button>
        {visible && (
          <motion.div
            className="size-64 bg-indigo-500 rounded-lg flex items-center justify-center align-middle p-4 gap-2"
            variants={box}
            initial="hidden"
            animate="visible"
            exit="exit"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimationPresence;
