import {
  useAnimationControls,
  motion,
  inView,
  ElementOrSelector,
} from "framer-motion";
import React from "react";

const InView = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    inView(ref.current as ElementOrSelector, (info) => {
      console.log("inView", info);
    });
  }, [ref]);

  return (
    <div className="border boreder-red-500 size-[500px] flex flex-col justify-center items-center">
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg flex flex-wrap gap-5"
        ref={ref}
      ></motion.div>
    </div>
  );
};

export default InView;
