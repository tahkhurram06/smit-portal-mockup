export interface StudentProfile {
  /** Profile photo URL. Leave null to show the initials avatar. */
  photoUrl: string | null;
  email: string;
  phone: string;
  address: string | null;
  gender: string;
  dateOfBirth: string;
  lastQualification: string | null;
  /** Digits only, e.g. "4220184207607". Use formatCnic() to display it. */
  cnic: string;
}

// Name and initials come from `student` in dashboardData.ts, same as the sidebar and topbar.
export const studentProfile: StudentProfile = {
  photoUrl: null,
  email: "abc@gmail.com",
  phone: "03146047157",
  address: null,
  gender: "Male",
  dateOfBirth: "November 14, 2006",
  lastQualification: null,
  cnic: "4220245678910",
};

/** "4220184207607" → "42201-8420760-7". Returns the input unchanged if it isn't 13 digits. */
export function formatCnic(cnic: string): string {
  const digits = cnic.replace(/\D/g, "");
  if (digits.length !== 13) return cnic;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
}