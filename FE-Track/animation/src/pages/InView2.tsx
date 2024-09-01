import { motion, useInView } from "framer-motion";
import React from "react";

const InView2 = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const inView = useInView(ref);
  console.log("inView: ", inView);

  return (
    <div className="border boreder-red-500 size-[500px] flex flex-col justify-center items-center">
      <motion.div
        className="size-64 bg-indigo-500 rounded-lg flex flex-wrap gap-5"
        ref={ref}
        animate={
          inView
            ? {
                opacity: 1,
                transition: {
                  delay: 0.7,
                },
              }
            : {
                opacity: 0,
              }
        }
      ></motion.div>
    </div>
  );
};

export default InView2;
