import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Bell, User, HomeIcon, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ sidebarOpen }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-4 sm:px-6 py-3.5 z-40 transition-all duration-300`}
    >
      <div
        className={`flex items-center gap-3 sm:gap-4 flex-1 transition-all duration-300 ${
          sidebarOpen ? "md:ml-50" : "md:ml-21"
        }`}
      >
        <Link
          to="/"
          className="text-zinc-400 hover:text-green-400 transition"
        >
          <HomeIcon size={24} />
        </Link>

        {/* Search bar */}
        <div className="relative flex-1 max-w-[200px] sm:max-w-xs md:max-w-sm">
          <Search size={16} className="absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="What do you want to hear..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-zinc-800 text-sm text-white rounded-full px-4 py-2 pl-9 w-full md:w-75 focus:outline-none focus:ring-1 focus:ring-green-400 placeholder-zinc-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-5 text-zinc-400 ml-3">
        <button className="hover:text-green-400 transition">
          <Bell size={20} />
        </button>
        <button className="hover:text-green-400 transition">
          <User size={20} />
        </button>
      </div>
    </header>
  );
}
