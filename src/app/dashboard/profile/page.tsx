"use client";

import DashboardLayout from "@/components/Students/Courses/Dashboard/Layout/DashboardLayout";
import ProfileHeader from "@/components/Students/Courses/Dashboard/Profile/ProfileHeader";
import ProfileCard from "@/components/Students/Courses/Dashboard/Profile/ProfileCard";
import ProfileField from "@/components/Students/Courses/Dashboard/Profile/ProfileField";
import EnrolledCourseItem from "@/components/Students/Courses/Dashboard/Profile/EnrolledCourseItem";
import { useLogout } from "@/hooks/useLogout";
import { activeCourse, student } from "@/lib/dashboardData";
import { studentProfile, formatCnic } from "@/lib/profileData";

const enrolledCourses = [activeCourse];

export default function ProfilePage() {
  const logout = useLogout();

  return (
    <DashboardLayout
      activeHref="/dashboard/profile"
      courseTitle={activeCourse.title}
    >
      <ProfileHeader
        name={student.name}
        initials={student.initials}
        photoUrl={studentProfile.photoUrl}
        delay={0.1}
      />

      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
        <ProfileCard
          title="Contact info"
          tone="teal"
          delay={0.18}
          icon={
            <>
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="m3 7 9 6 9-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          }
        >
          <dl className="flex flex-col divide-y divide-ov/[0.07] [&>div]:py-3.5 [&>div:first-child]:pt-0 [&>div:last-child]:pb-0">
            <ProfileField label="Email" value={studentProfile.email} breakAll />
            <ProfileField label="Phone" value={studentProfile.phone} numeric />
            <ProfileField label="Address" value={studentProfile.address} />
          </dl>
        </ProfileCard>

        <div className="flex flex-col gap-4 sm:gap-5">
          <ProfileCard
            title="Personal information"
            tone="purple"
            delay={0.24}
            icon={
              <>
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M20 21a8 8 0 1 0-16 0"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </>
            }
          >
            <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <ProfileField label="Gender" value={studentProfile.gender} />
              <ProfileField
                label="Date of birth"
                value={studentProfile.dateOfBirth}
              />
              <ProfileField
                label="Last qualification"
                value={studentProfile.lastQualification}
              />
              <ProfileField
                label="CNIC"
                value={formatCnic(studentProfile.cnic)}
                numeric
              />
            </dl>
          </ProfileCard>

          <ProfileCard
            title="Enrolled courses"
            tone="teal"
            delay={0.3}
            icon={
              <>
                <path
                  d="M12 6.5C10.5 5 8 4.5 4 4.5v13c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-13c-4 0-6.5.5-8 2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6.5v13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </>
            }
            trailing={
              <span
                aria-label={`${enrolledCourses.length} enrolled`}
                className="flex h-6 min-w-6 items-center justify-center rounded-full border border-ov/[0.1] bg-ov/[0.06] px-2 text-[11px] font-semibold tabular-nums text-teal"
              >
                {enrolledCourses.length}
              </span>
            }
          >
            {enrolledCourses.length === 0 ? (
              <p className="text-[12.5px] text-dim">
                You&apos;re not enrolled in a course yet.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {enrolledCourses.map((course) => (
                  <EnrolledCourseItem key={course.roll} course={course} />
                ))}
              </div>
            )}
          </ProfileCard>
        </div>
      </div>

      <div
        className="mt-5 flex animate-[fadeUp_0.5s_ease_both] justify-end sm:mt-6"
        style={{ animationDelay: "0.36s" }}
      >
        <button
          type="button"
          onClick={logout}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[11px] border border-[#FF6B6B]/30 bg-[#FF6B6B]/[0.08] px-5 py-3 font-sora text-sm font-semibold text-red outline-none transition-all duration-200 hover:border-[#FF6B6B]/50 hover:bg-[#FF6B6B]/[0.14] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 sm:w-auto"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M16 8l4 4-4 4M20 12H9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Log out
        </button>
      </div>
    </DashboardLayout>
  );
}
