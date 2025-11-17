"use client";

import Link from "next/link";
import React, { forwardRef } from "react";
// Prefer global button classes from app/styles/buttons.css to avoid module @apply problems
// and keep a single global source for button styles.
function classNames(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // allow some anchor props for Link use-case
  target?: string;
  rel?: string;
  variant?: "primary" | "secondary" | "ghost" | "icon" | "outline";
  href?: string;
  roundedFull?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, href, roundedFull, ...props }, ref) => {
    const variantClass =
      variant === "primary"
        ? "btn-primary"
        : variant === "secondary"
        ? "btn-secondary"
        : variant === "ghost"
        ? "btn-ghost"
        : variant === "icon"
        ? "btn-icon"
        : "btn-outline";

    const classes = classNames(
      "btn",
      variantClass,
      className,
      roundedFull ? "btn-roundedFull" : "",
      props.disabled ? "btn-disabled" : ""
    );

    const { children, disabled, onClick, target, rel } = props;
    const anchorOnClick = onClick as unknown as
      | React.MouseEventHandler<HTMLAnchorElement>
      | undefined;

    if (href) {
      // external links are rendered as anchors using Next Link
      return (
        <Link
          href={href}
          className={classes}
          aria-disabled={disabled}
          onClick={anchorOnClick}
          target={target}
          rel={rel}
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {props.children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
