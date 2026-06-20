import AppShell from "@/components/layout/AppShell";
import MockTestExam from "@/components/mock-test/MockTestExam";

export const metadata = {
  title: "Mock Test — In Progress",
  robots: { index: false, follow: false },
};

export default function MockTestTakePage() {
  return (
    <AppShell showSidebar={false} hideBottomNav>
      <MockTestExam />
    </AppShell>
  );
}
