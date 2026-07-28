"use client";

import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  as?: "button" | "a";
  href?: string;
} & (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button"; href?: never })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string })
);

const variantStyles: Record<Variant, string> = {
  primary:
    "border border-[var(--steel)] bg-[var(--steel)] text-[var(--sand)] hover:bg-[var(--steel-bright)] hover:border-[var(--steel-bright)]",
  outline:
    "border border-white/20 text-[var(--sand)] hover:border-[var(--accent)]",
  ghost:
    "text-[var(--mist)] hover:text-[var(--sand)] border border-transparent",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  as = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-block font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (as === "a") {
    const { ...anchorProps } = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
