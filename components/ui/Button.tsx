"use client";
import { clsx } from "clsx";
export default function Button({ children, variant="primary", className, ...props }:{
  children: React.ReactNode; variant?: "primary"|"ghost"|"outline"; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = "btn";
  const kind = variant === "primary" ? "btn-primary"
    : variant === "ghost" ? "btn-ghost"
    : "border border-white/10 hover:bg-white/5";
  return <button className={clsx(base, kind, className)} {...props}>{children}</button>;
}
