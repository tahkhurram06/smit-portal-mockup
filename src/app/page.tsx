import AuroraBackground from "@/components/Background/AuroraBackground";
import LoginCard from "@/components/Login/LoginCard";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Page() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page px-4 py-8 text-fg">
      <AuroraBackground />
      <div className="absolute right-4 top-4 z-[3] sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>
      <LoginCard />
    </main>
  );
}