// Intended path: components/Teacher/Dashboard/Layout/TeacherDashboardLayout.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { activeBatch } from "@/lib/batchData";
import TeacherSidebar from "./TeacherSidebar";
import TeacherTopbar from "./TeacherTopbar";

interface TeacherDashboardLayoutProps {
  activeKey: string;
  children: React.ReactNode;
}

export default function TeacherDashboardLayout({
  activeKey,
  children,
}: TeacherDashboardLayoutProps) {
  const router = useRouter();
  const checked = useAuthGuard("teacher");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!checked) return null;

  return (
    <div className="relative flex min-h-screen bg-page text-fg">
      <TeacherSidebar
        activeKey={activeKey}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main className="relative z-[2] min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <TeacherTopbar
          courseTitle={activeBatch.title}
          activeKey={activeKey}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />
        {children}
      </main>
    </div>
  );
}