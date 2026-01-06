import React from "react";

interface DividerProps {
  icon: React.ComponentType<{ className?: string }>;
}

export function Divider({ icon: Icon }: DividerProps) {
  return (
    <div className="relative my-6 flex items-center">
      {/* Gradient line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--tw-gradient-via)] to-transparent gradient-accent-1-contrast" />

      {/* Icon */}
      <div className="absolute left-1/2 -translate-x-1/2 bg-white p-5">
        <Icon className="w-4 h-4 text-accent-1-contrast" />
      </div>
    </div>
  );
}
