// Intended path: hooks/useAuthGuard.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Redirects to "/" unless the stored role matches `allowedRole`.
 * Defaults to "student" so every existing call site (student pages)
 * keeps working unchanged. Teacher pages call useAuthGuard("teacher").
 */
export function useAuthGuard(allowedRole: string = "student") {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("smit_role") !== allowedRole) {
      router.replace("/");
      return;
    }
    setChecked(true);
  }, [router, allowedRole]);

  return checked;
}