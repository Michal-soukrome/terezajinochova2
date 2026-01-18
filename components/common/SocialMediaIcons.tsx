"use client";

import { Instagram } from "lucide-react";

interface SocialMediaIconsProps {
  className?: string;
  iconClassName?: string;
}

export function SocialMediaIcons({
  className = "flex space-x-4",
  iconClassName = " transition-colors duration-200",
}: SocialMediaIconsProps) {
  return (
    <div className={className}>
      <a
        href="https://www.instagram.com/svatebni_pribehy/"
        target="_blank"
        rel="noopener noreferrer"
        className={iconClassName}
        aria-label="Instagram"
      >
        <Instagram
          strokeWidth={0.5}
          className="w-5 h-5 fill-accent-1 text-accent-1-contrast "
        />
      </a>
    </div>
  );
}
