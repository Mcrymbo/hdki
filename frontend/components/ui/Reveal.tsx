"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type Direction = "up" | "fade" | "left" | "right";

interface RevealProps
  extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition" | "children"> {
  direction?: Direction;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 16 },
  fade: {},
  left: { x: -16 },
  right: { x: 16 },
};

export default function Reveal({ direction = "up", delay = 0, duration = 0.5, children, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = offsets[direction];

  if (reduceMotion) {
    return <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
