"use client";

import { useState, useEffect } from "react";

interface BackToTopProps {
  className?: string;
  showThreshold?: number;
}

export function BackToTop({
  className = "",
  showThreshold = 300,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const newIsVisible = scrollY > showThreshold;

      if (newIsVisible && !isVisible) {
        // Becoming visible - trigger animation
        setShouldAnimate(true);
        setTimeout(() => setShouldAnimate(false), 600); // Reset after animation duration
      }

      setIsVisible(newIsVisible);
    };

    window.addEventListener("scroll", toggleVisibility);

    // Check initial scroll position
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [showThreshold, isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-50 bg-amber-800 hover:bg-amber-700 cursor-pointer text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none translate-y-full"
      } ${shouldAnimate ? "animate-bounce-in" : ""} ${className}`}
      aria-label="Back to top"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
