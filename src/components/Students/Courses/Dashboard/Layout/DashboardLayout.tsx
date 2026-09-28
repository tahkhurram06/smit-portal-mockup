"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Sidebar from "./SideBar/Sidebar";
import Topbar from "./Topbar";
import StudentBottomNav from "./StudentBottomNav";

interface DashboardLayoutProps {
  activeHref: string;
  courseTitle: string;
  children: React.ReactNode;
}

export default function DashboardLayout({
  activeHref,
  courseTitle,
  children,
}: DashboardLayoutProps) {
  const router = useRouter();
  const checked = useAuthGuard();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!checked) return null;

  return (
    <div className="relative flex min-h-screen bg-page text-fg">
      <Sidebar
        activeHref={activeHref}
        onNavigate={(href) => {
          setMobileOpen(false);
          router.push(href);
        }}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* bottom padding leaves room for the fixed bottom nav below lg */}
      <main className="relative z-[2] min-w-0 flex-1 px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-5 sm:px-6 sm:pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pt-6 lg:px-8 lg:pb-8 lg:pt-8">
        <Topbar
          activeHref={activeHref}
          courseTitle={courseTitle}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />
        {children}
      </main>

      <StudentBottomNav activeHref={activeHref} />
    </div>
  );
}