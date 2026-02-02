// Reusable Framer Motion animation variants
// Designed for scroll-based reveals without affecting layout

export const animationVariants = {
  // Fade up with subtle lift
  fadeUp: {
    initial: {
      opacity: 0,
      y: 40,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
  },

  // Simple fade in
  fadeIn: {
    initial: {
      opacity: 0,
    },
    whileInView: {
      opacity: 1,
    },
  },

  // Slide from left
  slideLeft: {
    initial: {
      opacity: 0,
      x: -60,
    },
    whileInView: {
      opacity: 1,
      x: 0,
    },
  },

  // Slide from right
  slideRight: {
    initial: {
      opacity: 0,
      x: 60,
    },
    whileInView: {
      opacity: 1,
      x: 0,
    },
  },

  // Scale in with fade
  scaleIn: {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    whileInView: {
      opacity: 1,
      scale: 1,
    },
  },

  // Stagger container (for children animations)
  staggerContainer: {
    initial: "initial",
    whileInView: "animate",
    viewport: {
      once: true,
      margin: "-80px",
    },
  },

  // Stagger child (for sequential animations)
  staggerChild: (delay = 0) => ({
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay * 0.1,
        duration: 0.6,
      },
    },
  }),
};

// Transition configuration
export const transitionConfig = {
  smooth: {
    duration: 0.6,
    ease: "easeOut",
  },
  fast: {
    duration: 0.4,
    ease: "easeOut",
  },
  slow: {
    duration: 0.8,
    ease: "easeOut",
  },
};
