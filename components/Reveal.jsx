"use client";

import { motion } from "motion/react";

//  Fades + lifts children into view as they scroll up. `delay` staggers items.
export default function Reveal({ children, delay = 0, y = 26, as = "div", className }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
