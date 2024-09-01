import { useAnimationControls, motion } from "framer-motion";
import React from "react";

const AnimationControls = () => {
  const controls = useAnimationControls();

  //   const handleForward = () => {
  //     controls.start({
  //       x: 200,
  //     });
  //   };

  //   const handleBackward = () => {
  //     controls.start({
  //       x: 0,
  //     });
  //   };

  React.useEffect(() => {
    controls.start((i) => ({
      x: 200,
      transition: { duration: 2, delay: i * 0.5 },
    }));
  }, []);

  return (
    <div className="border boreder-red-500 size-[500px] flex flex-col justify-center">
      {/* <button className="bg-green-500 mb-10 mx-2 py-3" onClick={handleForward}>
        Forward
      </button>
      <button className="bg-green-500 mb-10 mx-2 py-3" onClick={handleBackward}>
        Backward
      </button> */}
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg flex flex-wrap gap-5"
        animate={controls}
        custom={0}
      ></motion.div>
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg flex flex-wrap gap-5"
        animate={controls}
        custom={1}
      ></motion.div>
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg flex flex-wrap gap-5"
        animate={controls}
        custom={2}
      ></motion.div>
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg flex flex-wrap gap-5"
        animate={controls}
        custom={3}
      ></motion.div>
    </div>
  );
};

export default AnimationControls;
