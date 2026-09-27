import type { ButtonHTMLAttributes } from "react";

const GRADIENT = "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)";

/**
 * The teal → purple → pink call-to-action used across the portal
 * (sign in, view details, copy voucher ID, send feedback).
 * Defaults to type="button"; pass type="submit" inside forms.
 */
export default function GradientButton({
  className = "",
  style,
  type = "button",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      {...props}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-[11px] bg-[length:220%_auto] bg-[position:0%_center] px-5 py-3 font-sora text-sm font-semibold text-[#0A0A12] shadow-[0_12px_30px_-12px_rgba(139,107,255,0.55)] transition-[background-position,box-shadow,transform,opacity] duration-500 enabled:hover:-translate-y-px enabled:hover:bg-[position:100%_center] enabled:hover:shadow-[0_14px_34px_-10px_rgba(139,107,255,0.7)] enabled:active:translate-y-px enabled:active:scale-[0.994] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      style={{ backgroundImage: GRADIENT, ...style }}
    >
      {children}
    </button>
  );
}