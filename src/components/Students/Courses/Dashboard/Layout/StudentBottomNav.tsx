// Intended path: components/Students/Courses/Dashboard/Layout/StudentBottomNav.tsx
"use client";

import { navItems } from "@/lib/dashboardData";
import BottomNav from "@/components/ui/BottomNav";
import { icons } from "./SideBar/SidebarNavItem";

interface StudentBottomNavProps {
  activeHref: string;
}

const items = navItems.map((item) => ({
  key: item.href,
  label: item.label,
  href: item.href,
  icon: icons[item.icon],
}));

export default function StudentBottomNav({ activeHref }: StudentBottomNavProps) {
  return <BottomNav items={items} activeKey={activeHref} />;
}