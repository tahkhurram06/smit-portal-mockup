export type FeedbackType = "bug" | "idea" | "other";

export interface FeedbackPayload {
  type: FeedbackType;
  message: string;
  images: File[];
}

export interface FeedbackTypeOption {
  key: FeedbackType;
  label: string;
  /** Tile highlight colour. Matches the StatusBadge palette (red / amber / purple). */
  accent: string;
  /** Icon colour. A token, so it gets darker in light mode. */
  text: string;
  placeholder: string;
}

export const feedbackTypes: FeedbackTypeOption[] = [
  {
    key: "bug",
    label: "Bug",
    accent: "#FF6B6B",
    text: "var(--red)",
    placeholder: "What happened, and what did you expect to happen?",
  },
  {
    key: "idea",
    label: "Idea",
    accent: "#FFC65A",
    text: "var(--amber)",
    placeholder: "What would make the portal better for you?",
  },
  {
    key: "other",
    label: "Other",
    accent: "#8B6BFF",
    text: "var(--purple)",
    placeholder: "What's on your mind?",
  },
];

export const idlePlaceholder = "Pick a type above, then tell us more.";

export const MAX_MESSAGE_CHARS = 500;
export const MAX_IMAGES = 3;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

export type FeedbackFormError = "noType" | "noMessage";

export const feedbackErrors = {
  noType: "Select a type first.",
  noMessage: "Write a few words about it first.",
  sendFailed: "We couldn't send your feedback. Check your connection and try again.",
} as const;