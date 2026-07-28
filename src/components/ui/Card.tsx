import type { ReactNode, MouseEventHandler } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "a";
  href?: string;
  onClick?: MouseEventHandler;
};

export function Card({
  children,
  className = "",
  hover = true,
  as = "div",
  href,
  onClick,
}: CardProps) {
  const classes = `border border-white/10 bg-black/30 px-4 py-4 backdrop-blur-sm ${
    hover ? "transition hover:border-white/25 hover:bg-black/40" : ""
  } ${className}`;

  if (as === "a" && href) {
    return (
      <a href={href} className={`block ${classes}`} onClick={onClick}>
        {children}
      </a>
    );
  }

  return <div className={classes} onClick={onClick}>{children}</div>;
}
