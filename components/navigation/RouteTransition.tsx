"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { routeTransition } from "@/lib/animations";
import FullPageLoader from "../common/FullPageLoader";

interface Props {
  children: React.ReactNode;
  locale: string;
}

export default function RouteTransition({ children, locale }: Props) {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(true);
      setPrevPath(pathname);

      // počkej, až se layout fakt domaluje
      requestAnimationFrame(() => {
        setIsLoading(false);
      });
    }
  }, [pathname, prevPath]);

  return (
    <>
      {isLoading && <FullPageLoader locale={locale} />}
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
    </>
  );
}
