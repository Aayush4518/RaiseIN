"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ParallaxText Component
 * Text moves upward as user scrolls, creating a parallax scrolling effect
 *
 * @param {React.ReactNode} children - Text content to animate
 * @param {number} offset - How much the text moves (default: 100, higher = more movement)
 * @param {string} className - Additional Tailwind classes
 */
export default function ParallexText({ children, offset = 100, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset], {
    clamp: true,
  });

  return (
    <motion.div 
      ref={ref} 
      style={{ y }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}
