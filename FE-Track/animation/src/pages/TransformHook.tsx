import { motion, useAnimate, useDragControls } from "framer-motion";
import React, { useEffect } from "react";

const TransformHook = () => {
  const controls = useDragControls();

  return (
    <div className="border boreder-red-500 size-[500px] flex flex-col justify-center items-center">
      <div
        className="size-64 bg-red-500 rounded-lg flex flex-wrap gap-5"
        onPointerDown={(e) => controls.start(e)}
      ></div>
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg flex flex-wrap gap-5"
        drag="x"
        dragControls={controls}
      ></motion.div>
    </div>
  );
};

export default TransformHook;
