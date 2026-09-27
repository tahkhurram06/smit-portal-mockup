"use client";

import { Role, roles } from "@/lib/roleCopy";

interface RoleSwitcherProps {
  activeRole: Role;
  onChange: (role: Role) => void;
  accent: string;
}

const labels: Record<Role, string> = {
  student: "Student",
  teacher: "Teacher",
  admin: "Admin",
};

export default function RoleSwitcher({
  activeRole,
  onChange,
  accent,
}: RoleSwitcherProps) {
  const activeIndex = roles.indexOf(activeRole);

  return (
    <div className="relative mb-6 flex rounded-full border border-ov/[0.13] bg-ov/[0.05] p-1">
      <div
        className="group absolute inset-y-1 left-1 z-[1] overflow-hidden rounded-full shadow-[0_2px_10px_-2px_rgba(0,0,0,0.4)] transition-transform duration-[350ms] ease-[cubic-bezier(0.34,1.4,0.64,1)]"
        style={{
          width: `calc((100% - 8px) / ${roles.length})`,
          transform: `translateX(calc(${activeIndex} * 100%))`,
          backgroundColor: accent,
        }}
      />
      {roles.map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onChange(role)}
          className={`group relative z-[2] flex-1 cursor-pointer overflow-hidden rounded-full px-1 py-2 font-sora text-xs font-semibold transition-colors duration-200 sm:text-[12.5px] ${
            activeRole === role
              ? "text-[#0A0A12]"
              : "text-muted hover:text-fg-soft"
          } focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2`}
        >
          {activeRole === role && (
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[length:250%_auto] bg-[position:0%_center] opacity-0 transition-[background-position,opacity] duration-[600ms] ease-out group-hover:bg-[position:100%_center] group-hover:opacity-100"
              style={{
                backgroundImage: `linear-gradient(90deg, ${accent}, #ffffff 50%, #FF57A8 85%, ${accent})`,
              }}
            />
          )}
          <span className="relative">{labels[role]}</span>
        </button>
      ))}
    </div>
  );
}