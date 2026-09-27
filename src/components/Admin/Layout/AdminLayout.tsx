"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import AdminSidebar from "./Sidebar/AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface AdminLayoutProps {
  activeHref: string;
  pageTitle: string;
  pageSubtitle: string;
  children: React.ReactNode;
}

export default function AdminLayout({
  activeHref,
  pageTitle,
  pageSubtitle,
  children,
}: AdminLayoutProps) {
  const router = useRouter();
  const checked = useAuthGuard("admin");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!checked) return null;

  return (
    <div className="relative flex min-h-screen bg-page text-fg">
      <AdminSidebar
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

      <main className="relative z-[2] min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <AdminTopbar pageTitle={pageTitle} onOpenMobileMenu={() => setMobileOpen(true)} />

        <div className="mb-5 animate-[fadeUp_0.5s_ease_0.1s_both] sm:mb-6">
          <p className="mb-1.5 font-fraunces text-2xl font-semibold leading-tight tracking-tight text-strong sm:text-[28px]">
            {pageTitle}
          </p>
          <p className="text-[13.5px] leading-relaxed text-muted">{pageSubtitle}</p>
        </div>

        {children}
      </main>
    </div>
  );
}