"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import GradientButton from "@/components/ui/GradientButton";
import FeedbackTypePicker from "./FeedbackTypePicker";
import ImageAttachments from "./ImageAttachments";
import {
  FeedbackFormError,
  FeedbackPayload,
  FeedbackType,
  MAX_MESSAGE_CHARS,
  feedbackErrors,
  feedbackTypes,
  idlePlaceholder,
} from "@/lib/feedbackData";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  /** Send the feedback to your API. Throw to show the "couldn't send" state. */
  onSubmit?: (payload: FeedbackPayload) => Promise<void> | void;
}

const labelClass =
  "mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-muted";

function FeedbackDialog({ onClose, onSubmit }: Omit<FeedbackModalProps, "open">) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [shown, setShown] = useState(false);
  const [type, setType] = useState<FeedbackType | null>(null);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState<FeedbackFormError | null>(null);
  // bumps on every failed click so the error box re-mounts and shakes again
  const [errorNonce, setErrorNonce] = useState(0);

  const sending = status === "sending";
  const active = feedbackTypes.find((t) => t.key === type);

  // open: fade scrim in, lock scroll, move focus in. close: put everything back.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, []);

  // the form unmounts on success, so hand focus to the Done button
  useEffect(() => {
    if (status === "sent") {
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
  }, [status]);

  function fail(kind: FeedbackFormError) {
    setFormError(kind);
    setErrorNonce((n) => n + 1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" && !sending) {
      onClose();
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;

    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      "button:not([disabled]), textarea, [href]",
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;

    // The button is always clickable; say what's missing instead of disabling it.
    if (!type) {
      fail("noType");
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
      return;
    }
    const trimmed = message.trim();
    if (trimmed.length === 0) {
      fail("noMessage");
      messageRef.current?.focus();
      return;
    }

    setFormError(null);
    setStatus("sending");
    try {
      await onSubmit?.({ type, message: trimmed, images });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const errorText = formError ? feedbackErrors[formError] : status === "error" ? feedbackErrors.sendFailed : null;
  const messageInvalid = formError === "noMessage";
  const nearLimit = message.length >= MAX_MESSAGE_CHARS - 50;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
      onKeyDown={handleKeyDown}
    >
      {/* scrim */}
      <div
        onClick={() => !sending && onClose()}
        aria-hidden="true"
        className={`absolute inset-0 bg-scrim backdrop-blur-sm transition-opacity duration-300 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* bottom sheet on phones, centred card from sm up */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-t-3xl border border-b-0 border-ov/[0.13] bg-panel/95 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 shadow-sheet backdrop-blur-2xl backdrop-saturate-150 motion-safe:animate-[sheetUp_0.45s_cubic-bezier(0.16,1,0.3,1)_both] sm:max-h-[calc(100dvh-2rem)] sm:max-w-[460px] sm:rounded-3xl sm:border-b sm:px-8 sm:pb-7 sm:pt-7 sm:shadow-dialog sm:motion-safe:animate-[cardIn_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#8B6BFF]/70 to-transparent"
        />
        {/* grab handle (phones) */}
        <span aria-hidden="true" className="mx-auto mb-4 block h-1 w-10 rounded-full bg-ov/[0.18] sm:hidden" />

        {status === "sent" ? (
          <div className="flex flex-col items-center py-4 text-center motion-safe:animate-[fadeUp_0.4s_ease_both]">
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_12px_30px_-10px_rgba(139,107,255,0.7)] motion-safe:animate-[popIn_0.45s_ease_both]"
              style={{ backgroundImage: "linear-gradient(100deg, #3FE6D6, #8B6BFF 55%, #FF57A8)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path
                  d="m5 13 4 4L19 7"
                  stroke="#0A0A12"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ strokeDasharray: 24 }}
                  className="motion-safe:animate-[drawCheck_0.45s_ease-out_0.2s_both]"
                />
              </svg>
            </div>
            <h2 id={titleId} className="font-fraunces text-2xl font-semibold tracking-tight text-strong">
              Feedback sent
            </h2>
            <p className="mt-1.5 max-w-[300px] text-[13.5px] leading-relaxed text-muted">
              Thanks for helping improve the portal. The SMIT team will read it.
            </p>
            <GradientButton onClick={onClose} data-autofocus className="mt-6 w-full">
              Done
            </GradientButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2
                  id={titleId}
                  className="mb-1.5 font-fraunces text-2xl font-semibold leading-tight tracking-tight text-strong sm:text-[28px]"
                >
                  Share your feedback
                </h2>
                <p className="text-[13.5px] leading-relaxed text-muted">
                  Tell us what&apos;s broken, what could be better, or anything else on your mind.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close feedback"
                className="group flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-ov/[0.1] text-muted outline-none transition-all duration-200 hover:border-ov/[0.2] hover:bg-ov/[0.06] hover:text-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                >
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* type */}
            <span className={labelClass} id={`${titleId}-type`}>
              Type <span className="text-pink">*</span>
            </span>
            <div className="mb-4">
              <FeedbackTypePicker
                value={type}
                onChange={(t) => {
                  setType(t);
                  if (formError === "noType") setFormError(null);
                }}
                invalid={formError === "noType"}
                labelledBy={`${titleId}-type`}
              />
            </div>

            {/* message */}
            <div className="mb-4">
              <label htmlFor={`${titleId}-message`} className={labelClass}>
                Your feedback <span className="text-pink">*</span>
              </label>
              <textarea
                id={`${titleId}-message`}
                ref={messageRef}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value.slice(0, MAX_MESSAGE_CHARS));
                  if (formError === "noMessage") setFormError(null);
                }}
                rows={3}
                placeholder={active?.placeholder ?? idlePlaceholder}
                aria-invalid={messageInvalid}
                className={`w-full resize-none rounded-[11px] border bg-ov/[0.045] px-3 py-3 text-sm leading-relaxed text-strong placeholder:text-dim transition-colors duration-200 focus:border-[#8B6BFF] focus:bg-[#8B6BFF]/[0.06] focus:shadow-[0_0_0_3.5px_rgba(139,107,255,0.18)] focus:outline-none ${
                  messageInvalid
                    ? "border-[#FF6B6B]/50 hover:border-[#FF6B6B]/70"
                    : "border-ov/[0.13] hover:border-ov/[0.22]"
                }`}
              />
              <p
                className={`mt-1.5 text-right text-[11px] tabular-nums transition-colors duration-200 ${
                  nearLimit ? "text-amber" : "text-dim"
                }`}
              >
                {message.length}/{MAX_MESSAGE_CHARS}
              </p>
            </div>

            {/* images */}
            <div className="mb-5">
              <ImageAttachments onChange={setImages} />
            </div>

            {errorText && (
              <p
                role="alert"
                key={`${formError ?? "send"}-${errorNonce}`}
                className={`mb-4 rounded-[10px] border border-[#FF6B6B]/30 bg-[#FF6B6B]/[0.08] px-3 py-2.5 text-[12px] leading-relaxed text-red ${
                  formError
                    ? "motion-safe:animate-[shake_0.4s_ease_both]"
                    : "motion-safe:animate-[fadeUp_0.3s_ease_both]"
                }`}
              >
                {errorText}
              </p>
            )}

            <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={sending}
                className="w-full cursor-pointer rounded-[11px] border border-ov/[0.13] bg-ov/[0.04] px-4 py-3 text-[13px] font-medium text-muted outline-none transition-all duration-200 hover:border-ov/[0.24] hover:bg-ov/[0.075] hover:text-strong active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
              >
                Cancel
              </button>
              <GradientButton type="submit" disabled={sending} className="w-full sm:w-auto sm:min-w-[150px]">
                {sending ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-[#0A0A12]/25 border-t-[#0A0A12]"
                    />
                    Sending…
                  </>
                ) : (
                  "Send feedback"
                )}
              </GradientButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function FeedbackModal({ open, onClose, onSubmit }: FeedbackModalProps) {
  if (!open || typeof document === "undefined") return null;
  // All dialog state lives in FeedbackDialog, so it resets every time the modal opens.
  return createPortal(<FeedbackDialog onClose={onClose} onSubmit={onSubmit} />, document.body);
}