"use client";

import { motion } from "framer-motion";
import { animationVariants, transitionConfig } from "@/app/lib/animationVariants";

/**
 * ScrollSection Component
 * Wraps sections with scroll-triggered animations
 * Maintains normal document flow and layout
 *
 * @param {string} variant - Animation variant name (fadeUp, fadeIn, slideLeft, slideRight, scaleIn)
 * @param {number} delay - Animation delay in seconds
 * @param {number} duration - Animation duration in seconds
 * @param {string} className - Additional Tailwind classes
 * @param {React.ReactNode} children - Section content
 * @param {object} viewport - Custom viewport settings
 */
export default function ScrollSection({
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  children,
  viewport = null,
}) {
  const animationVariant = animationVariants[variant] || animationVariants.fadeUp;

  const defaultViewport = {
    once: true,
    margin: "-80px",
  };

  return (
    <motion.div
      initial={animationVariant.initial}
      whileInView={animationVariant.whileInView}
      viewport={viewport || defaultViewport}
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
