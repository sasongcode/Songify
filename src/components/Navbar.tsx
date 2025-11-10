import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Bell, User, HomeIcon, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ sidebarOpen }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Ketika pindah halaman, reset search bar dan hapus query
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.blur();
    }
    localStorage.removeItem("searchQuery");
    setIsSearching(false);
  }, [location.pathname]); // jalankan setiap path berubah

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const query = inputRef.current.value.trim();
      if (query) {
        localStorage.setItem("searchQuery", query);
        navigate(`/search?query=${encodeURIComponent(query)}`);
        setIsSearching(true); // masuk mode hasil pencarian
        inputRef.current.blur();
      }
    }
  };

  const handleFocus = () => {
    setIsSearching(false); // keluar mode hasil pencarian
  };

  // Saat reload, ambil query terakhir agar tetap muncul
  useEffect(() => {
    const savedQuery = localStorage.getItem("searchQuery");
    if (savedQuery && inputRef.current) {
      inputRef.current.value = savedQuery;
      setIsSearching(true);
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-4 sm:px-6 py-3.5 z-40 transition-all duration-300`}
    >
      <div
        className={`flex items-center gap-3 sm:gap-4 flex-1 transition-all duration-300 ${
          sidebarOpen ? "md:ml-50" : "md:ml-21"
        }`}
      >
        <Link to="/" className="text-zinc-400 hover:text-green-400 transition">
          <HomeIcon size={24} />
        </Link>

        {/* Search bar */}
        <div className="relative flex-1 max-w-[200px] sm:max-w-xs md:max-w-sm">
          <Search size={16} className="absolute left-3 top-2.5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="What do you want to hear..."
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            className={`text-sm text-white rounded-full px-4 py-2 pl-9 w-full md:w-75 focus:outline-none placeholder-zinc-500 transition-all duration-200
              ${
                isSearching
                  ? "bg-zinc-700 focus:ring-0 text-zinc-300" // mode hasil pencarian
                  : "bg-zinc-800 focus:ring-1 focus:ring-green-400"
              }`}
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
