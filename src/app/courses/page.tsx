"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import CoursesTopbar from "@/components/Students/Courses/CoursesTopbar";
import CourseCard from "@/components/Students/Courses/CourseCard";
import ExploreMoreCard from "@/components/Students/Courses/ExploreMoreCard";
import { activeCourse } from "@/lib/dashboardData";

export default function CoursesPage() {
  const checked = useAuthGuard();

  if (!checked) return null;

  return (
    <main className="min-h-screen bg-page px-4 py-6 text-fg sm:px-8 sm:py-8 lg:px-12">
      <CoursesTopbar />

      <div className="mx-auto max-w-2xl">
        <p className="mb-4 animate-[fadeUp_0.4s_ease_both] text-[12.5px] font-medium uppercase tracking-wide text-muted">
          My courses
        </p>

        <div className="flex flex-col gap-4">
          <CourseCard course={activeCourse} delay={0.08} />
          <ExploreMoreCard delay={0.16} />
        </div>
      </div>
    </main>
  );
}
