import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

interface AppShellProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  hideFooter?: boolean;
  hideBottomNav?: boolean;
}

export default function AppShell({
  children,
  showSidebar = true,
  hideFooter = false,
  hideBottomNav = false,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main className={`min-w-0 w-full flex-1 overflow-x-hidden ${hideBottomNav ? "" : "pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0"}`}>
          {children}
        </main>
      </div>
      {!hideFooter && <Footer />}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
