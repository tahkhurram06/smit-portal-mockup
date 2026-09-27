// Intended path: components/Login/AuthForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Role, RoleCopy, demoPassword } from "@/lib/roleCopy";
import PasswordInput from "./PasswordInput";

interface AuthFormProps {
  role: Role;
  copy: RoleCopy;
}

// Where each role lands after signing in.
const roleLandingHref: Record<Role, string> = {
  student: "/courses",
  teacher: "/teacher/batches",
  admin:   "/admin/dashboard",
};

export default function AuthForm({ role, copy }: AuthFormProps) {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sessionStorage.setItem("smit_role", role);
        router.push(roleLandingHref[role]);
      }}
      className="animate-[fadeUp_0.6s_ease_0.46s_both]"
    >
      <div className="mb-4">
        <label
          htmlFor="identifier"
          className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-muted"
        >
          {copy.idLabel}
        </label>
        <input
          key={copy.idDemoValue}
          id="identifier"
          type={copy.idType}
          placeholder={copy.idPlaceholder}
          defaultValue={copy.idDemoValue}
          className="w-full rounded-[11px] border border-ov/[0.13] bg-ov/[0.045] px-3 py-3 text-sm text-strong placeholder:text-dim transition-colors duration-200 hover:border-ov/[0.22] focus:border-[#8B6BFF] focus:bg-[#8B6BFF]/[0.06] focus:shadow-[0_0_0_3.5px_rgba(139,107,255,0.18)] focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <PasswordInput defaultValue={demoPassword} />
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <label className="flex cursor-pointer select-none items-center gap-1.5 text-xs text-muted">
          <input
            type="checkbox"
            className="h-[15px] w-[15px] shrink-0 cursor-pointer appearance-none rounded-[5px] border border-ov/[0.13] bg-ov/[0.05] transition-colors duration-200 checked:border-[#8B6BFF] checked:bg-[#8B6BFF] relative checked:after:absolute checked:after:left-[4.5px] checked:after:top-[1.5px] checked:after:h-2 checked:after:w-1 checked:after:rotate-45 checked:after:border-r-2 checked:after:border-b-2 checked:after:border-panel"
          />
          Remember me
        </label>
        <a
          href="#"
          className="text-xs text-muted transition-colors duration-200 hover:text-strong"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full rounded-[11px] bg-[length:220%_auto] bg-[position:0%_center] px-4 py-3.5 font-sora text-sm font-semibold text-[#0A0A12] shadow-[0_12px_30px_-12px_rgba(139,107,255,0.55)] transition-[background-position,box-shadow,transform] duration-500 hover:bg-[position:100%_center] hover:shadow-[0_14px_34px_-10px_rgba(139,107,255,0.7)] active:translate-y-px active:scale-[0.994] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
        style={{
          backgroundImage:
            "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)",
        }}
      >
        Sign in
      </button>
    </form>
  );
}