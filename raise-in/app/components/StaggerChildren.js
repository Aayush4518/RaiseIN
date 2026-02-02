"use client";

import { motion } from "framer-motion";

/**
 * StaggerChildren Component
 * Animates direct children sequentially
 * Does not affect parent layout height
 *
 * @param {React.ReactNode} children - Child elements to stagger
 * @param {number} staggerDelay - Delay between each child (in seconds)
 * @param {string} className - Additional Tailwind classes
 * @param {object} viewport - Custom viewport settings
 */
export default function StaggerChildren({
  children,
  staggerDelay = 0.1,
  className = "",
  viewport = null,
}) {
  const defaultViewport = {
    once: true,
    margin: "-80px",
  };

  const containerVariants = {
    initial: "initial",
    whileInView: "animate",
    viewport: viewport || defaultViewport,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0,
    },
  };

  const childVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={defaultViewport}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
