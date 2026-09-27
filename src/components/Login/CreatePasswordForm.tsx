import { demoPassword } from "@/lib/roleCopy";
import PasswordInput from "./PasswordInput";

export default function CreatePasswordForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="animate-[fadeUp_0.6s_ease_0.4s_both]"
    >
      <div className="mb-4">
        <label
          htmlFor="create-cnic"
          className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-muted"
        >
          CNIC
        </label>
        <input
          id="create-cnic"
          type="text"
          placeholder="42101-0000000-0"
          defaultValue="42101-6304521-3"
          required
          className="w-full rounded-[11px] border border-ov/[0.13] bg-ov/[0.045] px-3 py-3 text-sm text-strong placeholder:text-dim transition-colors duration-200 hover:border-ov/[0.22] focus:border-[#8B6BFF] focus:bg-[#8B6BFF]/[0.06] focus:shadow-[0_0_0_3.5px_rgba(139,107,255,0.18)] focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="create-dob"
          className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-muted"
        >
          Date of birth
        </label>
        <input
          id="create-dob"
          type="date"
          defaultValue="2004-03-17"
          required
          className="w-full rounded-[11px] border border-ov/[0.13] bg-ov/[0.045] px-3 py-3 text-sm text-strong placeholder:text-dim transition-colors duration-200 hover:border-ov/[0.22] focus:border-[#8B6BFF] focus:bg-[#8B6BFF]/[0.06] focus:shadow-[0_0_0_3.5px_rgba(139,107,255,0.18)] focus:outline-none"
        />
      </div>

      <div className="mb-2">
        <PasswordInput
          id="create-password"
          label="New password"
          defaultValue={demoPassword}
        />
      </div>

      <p className="mb-5 text-[11.5px] leading-relaxed text-muted">
        Use the CNIC and date of birth from your SMIT course registration.
      </p>

      <button
        type="submit"
        className="w-full rounded-[11px] bg-[length:220%_auto] bg-[position:0%_center] px-4 py-3.5 font-sora text-sm font-semibold text-[#0A0A12] shadow-[0_12px_30px_-12px_rgba(139,107,255,0.55)] transition-[background-position,box-shadow,transform] duration-500 hover:bg-[position:100%_center] hover:shadow-[0_14px_34px_-10px_rgba(139,107,255,0.7)] active:translate-y-px active:scale-[0.994] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
        style={{
          backgroundImage:
            "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)",
        }}
      >
        Create password
      </button>
    </form>
  );
}