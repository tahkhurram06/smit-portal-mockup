interface SwitchProps {
  on: boolean;
}

/**
 * Purely visual on/off pill. The row that contains it carries the accessible
 * state (role="menuitemcheckbox" + aria-checked), so this is hidden from screen readers.
 */
export default function Switch({ on }: SwitchProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative h-[19px] w-8 shrink-0 rounded-full border transition-colors duration-200 ${
        on ? "border-transparent" : "border-ov/[0.2] bg-ov/[0.08]"
      }`}
      style={on ? { backgroundImage: "linear-gradient(100deg, #3FE6D6, #8B6BFF)" } : undefined}
    >
      <span
        className={`absolute top-[2px] h-[13px] w-[13px] rounded-full transition-all duration-200 ${
          on ? "left-[15px] bg-white" : "left-[2px] bg-dim"
        }`}
      />
    </span>
  );
}