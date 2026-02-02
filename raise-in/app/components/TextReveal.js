"use client";

import { motion } from "framer-motion";

/**
 * TextReveal Component
 * Animates text elements with a subtle upward reveal effect
 * Perfect for headlines, paragraphs, and descriptions
 *
 * @param {React.ReactNode} children - Text content
 * @param {number} delay - Animation delay in seconds
 * @param {number} duration - Animation duration in seconds
 * @param {string} className - Additional Tailwind classes
 * @param {number} distance - How far to translate up (default: 30px)
 */
export default function TextReveal({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  distance = 30,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: distance,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        duration,
        ease: "easeOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
