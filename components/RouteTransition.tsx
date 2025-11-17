"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import { routeTransition } from "@/lib/animations";

interface Props {
  children: React.ReactNode;
}

export default function RouteTransition({ children }: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={routeTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
