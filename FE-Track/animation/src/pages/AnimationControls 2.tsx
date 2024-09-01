import { useAnimationControls, motion, useCycle } from "framer-motion";
import React from "react";

const AnimationControls2 = () => {
  const boxAnimations = [{ x: 100 }, { x: 0 }, { x: 200 }, { x: 0 }];

  const [animate, cycle] = useCycle(...boxAnimations);
  return (
    <div className="border boreder-red-500 size-[500px] flex flex-col justify-center items-center">
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg flex flex-wrap gap-5"
        animate={animate}
        onTap={() => cycle()}
        custom={0}
      ></motion.div>
    </div>
  );
};

export default AnimationControls2;
