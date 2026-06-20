import { Suspense } from "react";
import AppShell from "@/components/layout/AppShell";
import MockTestResults from "@/components/mock-test/MockTestResults";

export const metadata = {
  title: "Mock Test Results",
  robots: { index: false, follow: false },
};

export default function MockTestResultsPage() {
  return (
    <AppShell showSidebar={false} hideBottomNav>
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          </div>
        }
      >
        <MockTestResults />
      </Suspense>
    </AppShell>
  );
}
