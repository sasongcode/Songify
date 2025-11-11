import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import MusicPlayerBar from "../components/MusicPlayerBar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // (mobile)
        setSidebarOpen(false);
      } else {
        // (desktop)
        setSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-zinc-950 text-white min-h-screen overflow-hidden">
      <ScrollToTop />
      {/* sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* konten utama */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "md:ml-50" : "md:ml-21"
        }`}
      >
        {/* navbar => sidebar */}
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="p-4 sm:p-6 md:p-8 py-20 md:py-24 flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <MusicPlayerBar sidebarOpen={sidebarOpen} />
      </div>
    </div>
  );
}
