import {
  motion,
  motionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect } from "react";

const ScrollHook = () => {
  const { scrollX, scrollXProgress, scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (e) => {
    console.log(e);
  });
  useMotionValueEvent(scrollYProgress, "change", (e) => {
    console.log("progress", e);
  });

  return (
    <motion.div
      className="size-64 bg-green-500 h-10 fixed top-0 w-full"
      style={{ scaleX: scrollYProgress }}
    ></motion.div>
  );
};

export default ScrollHook;
