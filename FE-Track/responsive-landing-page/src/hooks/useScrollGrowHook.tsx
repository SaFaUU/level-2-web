import { useScroll, useTransform } from "framer-motion";
import React from "react";

const useScrollGrowHook = () => {
  const componentRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: componentRef,
    offset: ["0 1", "1.5 1"],
  });

  const scaleValues = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityValues = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

  const style = { scale: scaleValues, opacity: opacityValues };

  return { componentRef, style };
};

export default useScrollGrowHook;
