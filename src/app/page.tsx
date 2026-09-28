import AuroraBackground from "@/components/Background/AuroraBackground";
import LoginCard from "@/components/Login/LoginCard";

export default function Page() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page px-4 py-8 text-fg">
      <AuroraBackground />
      <LoginCard />
    </main>
  );
}