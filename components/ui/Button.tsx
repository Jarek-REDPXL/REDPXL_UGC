import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "invert" | "ghost" | "whatsapp";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  external?: boolean;
  className?: string;
  icon?: ReactNode;
  ariaLabel?: string;
};

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  invert: "btn-invert",
  ghost: "btn-ghost",
  whatsapp: "btn-whatsapp",
};

/** DESIGN.md §8.1 — buttons. Renders an anchor when href is given. */
export default function Button({
  children,
  variant = "primary",
  href,
  external,
  className = "",
  icon,
  ariaLabel,
}: ButtonProps) {
  const cls = `btn ${variantClass[variant]} ${className}`;
  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
