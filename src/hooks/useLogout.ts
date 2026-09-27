"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

/**
 * Clears the session flag that useAuthGuard checks, then sends the person
 * back to the sign-in page. `replace` keeps the dashboard out of the back stack.
 */
export function useLogout() {
  const router = useRouter();

  return useCallback(() => {
    sessionStorage.removeItem("smit_role");
    router.replace("/");
  }, [router]);
}