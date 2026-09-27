interface ProfileFieldProps {
  label: string;
  /** Empty or null shows "Not provided" with an Add button. */
  value?: string | null;
  /** Called when the person taps "Add" on an empty field. */
  onAdd?: () => void;
  /** Tabular figures, for phone numbers and IDs. */
  numeric?: boolean;
  /** Let long values (emails) break anywhere instead of overflowing the card. */
  breakAll?: boolean;
}

/** Render inside a <dl>. Spacing and dividers are up to the parent. */
export default function ProfileField({
  label,
  value,
  onAdd,
  numeric = false,
  breakAll = false,
}: ProfileFieldProps) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-wide text-dim">{label}</dt>
      <dd className="mt-1 text-[14px]">
        {value ? (
          <span
            className={`font-medium text-strong ${numeric ? "tabular-nums" : ""} ${
              breakAll ? "break-all" : ""
            }`}
          >
            {value}
          </span>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <span className="text-dim">Not provided</span>
            <button
              type="button"
              onClick={onAdd}
              aria-label={`Add ${label.toLowerCase()}`}
              className="-my-1.5 shrink-0 cursor-pointer rounded-[7px] px-2.5 py-1.5 font-sora text-[11px] font-semibold uppercase tracking-wide text-teal outline-none transition-colors duration-200 hover:bg-[#3FE6D6]/10 hover:text-teal-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
            >
              Add
            </button>
          </div>
        )}
      </dd>
    </div>
  );
}