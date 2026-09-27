"use client";

import { useState } from "react";

interface PasswordInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
}

export default function PasswordInput({
  id = "password",
  label = "Password",
  placeholder = "••••••••",
  defaultValue,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-muted"
      >
        {label}
      </label>
      <div className="flex items-center rounded-[11px] border border-ov/[0.13] bg-ov/[0.045] pr-1.5 transition-colors duration-200 focus-within:border-[#8B6BFF] focus-within:bg-[#8B6BFF]/[0.06] focus-within:shadow-[0_0_0_3.5px_rgba(139,107,255,0.18)]">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-full flex-1 bg-transparent px-3 py-3 text-sm text-strong placeholder:text-dim focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="shrink-0 cursor-pointer rounded-[7px] px-2.5 py-2 font-sora text-[11px] font-semibold uppercase tracking-wide text-teal transition-colors duration-200 hover:bg-[#3FE6D6]/10 hover:text-teal-hi"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}