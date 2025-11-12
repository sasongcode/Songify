import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Users, Flame, Menu, ListMusic } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();

  const sidebarMenu = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <Flame size={20} />, label: "Trending", path: "/trending" },
    { icon: <Compass size={20} />, label: "Genres", path: "/genres" },
    { icon: <Users size={20} />, label: "Artists", path: "/artists" },
    { icon: <ListMusic size={20} />, label: "Playlist", path: "/playlist" },
  ];

  return (
    <>
      {/* sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between transition-all duration-300 
  z-50
  ${
    sidebarOpen
      ? "w-50 translate-x-0"
      : "-translate-x-full md:translate-x-0 md:w-21"
  }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <img
            src={sidebarOpen ? "/songify.png" : "/songifybrand.png"}
            alt="Brand Logo"
            className={`object-cover transition-all duration-300 ${
              sidebarOpen ? "h-8 w-auto" : "h-8 w-8 mx-auto"
            }`}
          />

          {/* toggle */}
          <button
            onClick={toggleSidebar}
            className="text-zinc-400 hover:text-white duration-500 hover:duration-500 hover:scale-105 transition ml-1"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* menu */}
        <nav className="flex-1 overflow-y-auto mt-4 px-2 me-2.5 space-y-1">
          {sidebarMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex ms-3 items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-zinc-800 text-green-400"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* footer */}
        <div className="p-3.5 text-center text-xs text-zinc-500">
          © 2025 Songify
        </div>
      </aside>

      {/* mobile */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-15 left-5 md:hidden bg-green-500 hover:bg-green-600 text-black p-3 rounded-full shadow-lg z-60"
        >
          <Menu size={22} />
        </button>
      )}
    </>
  );
}
