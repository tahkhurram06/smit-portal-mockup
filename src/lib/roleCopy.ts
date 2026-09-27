export type Role = "student" | "teacher" | "admin";

export interface RoleCopy {
  heading: string;
  subtext: string;
  idLabel: string;
  idPlaceholder: string;
  idType: "text" | "email";
  idDemoValue: string;
  accent: string; // tailwind color token used by the switcher indicator
}

export const roles: Role[] = ["student", "teacher", "admin"];

export const roleCopy: Record<Role, RoleCopy> = {
  student: {
    heading: "Welcome back",
    subtext: "Sign in with your student credentials.",
    idLabel: "CNIC number",
    idPlaceholder: "42101-0000000-0",
    idType: "text",
    idDemoValue: "42101-6304521-3",
    accent: "#3FE6D6",
  },
  teacher: {
    heading: "Hello, mentor",
    subtext: "Sign in to manage your batches.",
    idLabel: "Gmail address",
    idPlaceholder: "you@gmail.com",
    idType: "email",
    idDemoValue: "sara.ahmed@gmail.com",
    accent: "#8B6BFF",
  },
  admin: {
    heading: "Admin console",
    subtext: "Restricted to authorised SMIT staff.",
    idLabel: "Admin username",
    idPlaceholder: "admin.smit",
    idType: "text",
    idDemoValue: "admin.smit",
    accent: "#FF57A8",
  },
};

export const demoPassword = "Smit@2026";