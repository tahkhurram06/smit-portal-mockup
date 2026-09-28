// Intended path: components/Teacher/Dashboard/Layout/TeacherDashboardLayout.tsx
"use client";

import { useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { activeBatch } from "@/lib/batchData";
import TeacherSidebar from "./TeacherSidebar";
import TeacherTopbar from "./TeacherTopbar";
import TeacherBottomNav from "./TeacherBottomNav";

interface TeacherDashboardLayoutProps {
  activeKey: string;
  children: React.ReactNode;
}

export default function TeacherDashboardLayout({
  activeKey,
  children,
}: TeacherDashboardLayoutProps) {
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

      {/* bottom padding leaves room for the fixed bottom nav below lg */}
      <main className="relative z-[2] min-w-0 flex-1 px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-5 sm:px-6 sm:pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pt-6 lg:px-8 lg:pb-8 lg:pt-8">
        <TeacherTopbar
          courseTitle={activeBatch.title}
          activeKey={activeKey}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />
        {children}
      </main>

      <TeacherBottomNav activeKey={activeKey} />
    </div>
  );
}