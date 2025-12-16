"use client";

import { useInView } from "react-intersection-observer";
import ReactCountUp from "react-countup";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

export function CountUp({
  end,
  duration = 2,
  suffix = "",
  decimals = 0,
}: CountUpProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className="text-4xl font-bold text-accent-1-contrast font-heading"
    >
      {inView ? (
        <ReactCountUp
          end={end}
          duration={duration}
          suffix={suffix}
          decimals={decimals}
        />
      ) : (
        <span>0{suffix}</span>
      )}
    </div>
  );
}
