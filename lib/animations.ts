export const overlayVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
};

export const menuItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } }),
};

export const routeTransition = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
};
