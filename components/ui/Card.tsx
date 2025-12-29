import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

type CardProps = DivProps & {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={[
        "rounded-xl2 border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

type CardBodyProps = DivProps & {
  className?: string;
  children: React.ReactNode;
};

/**
 * CardBody is a convenience wrapper used across pages.
 * Default padding matches typical card layouts; can be overridden via className.
 */
export function CardBody({ className = "", children, ...props }: CardBodyProps) {
  return (
    <div
      {...props}
      className={["p-5 sm:p-6", className].join(" ")}
    >
      {children}
    </div>
  );
}
