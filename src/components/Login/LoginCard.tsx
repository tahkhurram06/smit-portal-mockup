"use client";

import { useState } from "react";
import { Role, roleCopy } from "@/lib/roleCopy";
import RoleSwitcher from "./RoleSwitcher";
import AuthForm from "./AuthForm";
import CreatePasswordForm from "./CreatePasswordForm";
import SSOButtons from "./SSOButtons";

type View = "login" | "create-password";

export default function LoginCard() {
  const [view, setView] = useState<View>("login");
  const [role, setRole] = useState<Role>("student");
  const copy = roleCopy[role];

  return (
    <div className="relative z-[2] w-full max-w-[400px] animate-[cardIn_0.7s_cubic-bezier(0.16,1,0.3,1)_0.05s_forwards] overflow-hidden rounded-3xl border border-ov/[0.13] bg-glass px-6 pb-8 pt-8 opacity-0 shadow-login backdrop-blur-2xl backdrop-saturate-150 sm:px-[34px] sm:pb-[32px] sm:pt-10">
      {/* sheen sweep */}
      <div className="pointer-events-none absolute left-[-60%] top-0 h-full w-2/5 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[0.09] to-transparent motion-safe:animate-[sweep_7s_ease-in-out_0.8s_infinite]" />

      {/* brand */}
      <div className="mb-6 flex animate-[fadeUp_0.6s_ease_0.2s_both] items-center gap-2.5">
        <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#3FE6D6] to-[#8B6BFF] shadow-[0_4px_14px_-3px_rgba(139,107,255,0.5)]">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <path
              d="M4 12L10 18L20 6"
              stroke="#0A0A12"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-xs tracking-wide text-muted">
          <b className="font-semibold tracking-wider text-strong">SMIT</b>{" "}
          &nbsp;Portal
        </div>
      </div>

      {view === "login" ? (
        <>
          <h1 className="mb-1.5 animate-[fadeUp_0.6s_ease_0.28s_both] font-fraunces text-2xl font-semibold leading-tight tracking-tight sm:text-[28px]">
            {copy.heading}
          </h1>
          <p className="mb-6 animate-[fadeUp_0.6s_ease_0.34s_both] text-[13.5px] leading-relaxed text-muted">
            {copy.subtext}
          </p>

          <RoleSwitcher
            activeRole={role}
            onChange={setRole}
            accent={copy.accent}
          />

          <AuthForm role={role} copy={copy} />

          <div className="animate-[fadeUp_0.6s_ease_0.5s_both]">
            <SSOButtons />
          </div>

          <div className="mt-5 animate-[fadeUp_0.6s_ease_0.58s_both] text-center text-xs text-muted">
            New here?{" "}
            <button
              type="button"
              onClick={() => setView("create-password")}
              className="group relative cursor-pointer font-semibold text-strong"
            >
              Create your password
              <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-[#3FE6D6] to-[#8B6BFF] transition-transform duration-200 group-hover:scale-x-100" />
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="mb-1.5 animate-[fadeUp_0.6s_ease_0.28s_both] font-fraunces text-2xl font-semibold leading-tight tracking-tight sm:text-[28px]">
            Create a password
          </h1>
          <p className="mb-6 animate-[fadeUp_0.6s_ease_0.34s_both] text-[13.5px] leading-relaxed text-muted">
            Provide the CNIC and date of birth used during SMIT course
            registration.
          </p>

          <CreatePasswordForm />

          <div className="mt-5 animate-[fadeUp_0.6s_ease_0.58s_both] text-center text-xs text-muted">
            Already have a password?{" "}
            <button
              type="button"
              onClick={() => setView("login")}
              className="group relative cursor-pointer font-semibold text-strong"
            >
              Back to login
              <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-[#3FE6D6] to-[#8B6BFF] transition-transform duration-200 group-hover:scale-x-100" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}