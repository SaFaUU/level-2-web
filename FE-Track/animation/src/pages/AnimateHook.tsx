import { motion, useAnimate } from "framer-motion";
import React, { useEffect } from "react";

const AnimateHook = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate([
      [scope.current, { scale: 2 }],
      [scope.current, { scale: 1 }],
    ]);
  }, []);

  return (
    <div className="border boreder-red-500 size-[500px] flex flex-col justify-center items-center">
      <div
        className="size-64 bg-indigo-500 rounded-lg flex flex-wrap gap-5"
        ref={scope}
      ></div>
    </div>
  );
};

export default AnimateHook;
