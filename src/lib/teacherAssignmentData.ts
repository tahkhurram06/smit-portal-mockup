export interface TeacherAssignmentRecord {
  title: string;
  description: string;
  topics: number;
  dueDate: string;
}

export const teacherAssignmentRecords: TeacherAssignmentRecord[] = [
  {
    title: "Admin panel (E-commerce)",
    description: "Create the provided UI design in React with full CRUD support for products, orders and users.",
    topics: 2,
    dueDate: "Sep 10, 2026",
  },
  {
    title: "QUICKSERVE MBA (Hackathon)",
    description: "Challenge: build a modern service-booking web app that connects vendors with customers in real time.",
    topics: 0,
    dueDate: "Aug 30, 2026",
  },
  {
    title: "E-Commerce Website",
    description: "React frontend. Create all required e-commerce pages using the shared component library.",
    topics: 3,
    dueDate: "Aug 17, 2026",
  },
  {
    title: "Furniture E-Comm.",
    description: "Follow the Figma design linked in the brief and match spacing, type and colour exactly.",
    topics: 2,
    dueDate: "Aug 12, 2026",
  },
  {
    title: "MashroniQ (Batch-2, Hackathon)",
    description: "MashroniQ — team submission, evaluated on functionality and UI polish.",
    topics: 0,
    dueDate: "Jul 12, 2026",
  },
  {
    title: "JavaScript Assignment",
    description: "Complete all 25 JavaScript questions available at the shared practice link.",
    topics: 6,
    dueDate: "Jul 10, 2026",
  },
  {
    title: "Budgeting App",
    description: "Develop a fully responsive and functional budgeting web app with category-based tracking.",
    topics: 2,
    dueDate: "Jun 1, 2026",
  },
  {
    title: "Amazon Clone",
    description: "Create a fully responsive landing page inspired by the official Amazon homepage.",
    topics: 3,
    dueDate: "May 24, 2026",
  },
  {
    title: "NASA Landing Page",
    description: "Create a fully responsive landing page inspired by the official NASA site.",
    topics: 4,
    dueDate: "May 1, 2026",
  },
  {
    title: "HelpXlytics AI — Comm.",
    description: "SMIT grand coding night — April 2026 challenge submission.",
    topics: 0,
    dueDate: "Apr 19, 2026",
  },
];