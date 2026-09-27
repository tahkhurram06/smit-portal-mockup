"use client";

import { useEffect, useRef, useState } from "react";
import { MAX_IMAGES, MAX_IMAGE_BYTES } from "@/lib/feedbackData";

interface Attachment {
  file: File;
  url: string;
}

interface ImageAttachmentsProps {
  /** Called with the current list of files every time it changes. */
  onChange: (files: File[]) => void;
}

/**
 * Owns its own preview URLs and revokes them on remove / unmount,
 * so the parent only ever deals with plain File objects.
 */
export default function ImageAttachments({ onChange }: ImageAttachmentsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Attachment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const itemsRef = useRef<Attachment[]>([]);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => itemsRef.current.forEach((i) => URL.revokeObjectURL(i.url));
  }, []);

  function commit(next: Attachment[]) {
    setItems(next);
    onChange(next.map((i) => i.file));
  }

  function addFiles(list: FileList | File[] | null) {
    if (!list) return;
    const next = [...items];
    let message: string | null = null;

    for (const file of Array.from(list)) {
      if (next.length >= MAX_IMAGES) {
        message = `You can attach up to ${MAX_IMAGES} images.`;
        break;
      }
      if (!file.type.startsWith("image/")) {
        message = `${file.name} isn't an image.`;
        continue;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        message = `${file.name} is larger than 5 MB.`;
        continue;
      }
      next.push({ file, url: URL.createObjectURL(file) });
    }

    setError(message);
    commit(next);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeAt(index: number) {
    URL.revokeObjectURL(items[index].url);
    setError(null);
    commit(items.filter((_, i) => i !== index));
  }

  const openPicker = () => inputRef.current?.click();

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Screenshots{" "}
          <span className="font-normal normal-case tracking-normal text-dim">(optional)</span>
        </span>
        {items.length > 0 && (
          <span className="text-[11px] tabular-nums text-dim">
            {items.length}/{MAX_IMAGES}
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => addFiles(e.target.files)}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`rounded-[12px] transition-all duration-200 ${
          dragging
            ? "scale-[1.01] bg-[#8B6BFF]/[0.08] ring-2 ring-[#8B6BFF]/50 ring-offset-[6px] ring-offset-panel"
            : ""
        }`}
      >
        {items.length === 0 ? (
          <button
            type="button"
            onClick={openPicker}
            className="group flex w-full cursor-pointer items-center gap-3 rounded-[11px] border border-dashed border-ov/[0.16] px-3 py-3 text-left outline-none transition-all duration-200 hover:-translate-y-px hover:border-[#8B6BFF]/50 hover:bg-ov/[0.03] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-ov/[0.05] text-muted transition-all duration-200 group-hover:scale-110 group-hover:bg-[#8B6BFF]/[0.14] group-hover:text-purple">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="9" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.6" />
                <path d="m4 18 5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-medium text-strong">Add screenshots</span>
              <span className="block text-[11.5px] leading-snug text-dim transition-colors duration-200 group-hover:text-muted">
                Click or drop images here. Up to {MAX_IMAGES}, 5 MB each.
              </span>
            </span>
          </button>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {items.map((item, i) => (
              <div
                key={item.url}
                className="group/thumb relative h-14 w-14 motion-safe:animate-[popIn_0.3s_ease_both] sm:h-16 sm:w-16"
              >
                <div className="h-full w-full overflow-hidden rounded-[10px] border border-ov/[0.13] transition-colors duration-200 group-hover/thumb:border-ov/[0.3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.file.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  aria-label={`Remove ${item.file.name}`}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-ov/[0.2] bg-panel text-muted outline-none transition-all duration-200 after:absolute after:-inset-1.5 after:content-[''] hover:scale-110 hover:border-[#FF6B6B]/50 hover:bg-red/15 hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}

            {items.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={openPicker}
                aria-label="Add another image"
                className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-[10px] border border-dashed border-ov/[0.16] text-muted outline-none transition-all duration-200 hover:-translate-y-px hover:border-[#8B6BFF]/50 hover:bg-ov/[0.03] hover:text-purple active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 sm:h-16 sm:w-16"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                >
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-2 text-[12px] leading-relaxed text-red motion-safe:animate-[fadeUp_0.3s_ease_both]"
        >
          {error}
        </p>
      )}
    </div>
  );
}