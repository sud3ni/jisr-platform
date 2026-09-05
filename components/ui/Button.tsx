import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-blue-700 hover:bg-blue-800 text-white"
      : "border border-blue-700 text-blue-700 hover:bg-blue-50";

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition ${styles} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
