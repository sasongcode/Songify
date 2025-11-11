import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Song {
  title: string;
  artist: string;
  image: string;
  url: string;
}

interface PlaylistContextType {
  playlist: Song[];
  addToPlaylist: (song: Song) => void;
  removeFromPlaylist: (url: string) => void;
  clearPlaylist: () => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlist, setPlaylist] = useState<Song[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("playlist");
    if (saved) {
      setPlaylist(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  const addToPlaylist = (song: Song) => {
    setPlaylist((prev) => {
      // Hindari duplikat
      const exists = prev.some((s) => s.url === song.url);
      if (exists) return prev;
      return [...prev, song];
    });
  };

  const removeFromPlaylist = (url: string) => {
    setPlaylist((prev) => prev.filter((s) => s.url !== url));
  };

  const clearPlaylist = () => setPlaylist([]);

  return (
    <PlaylistContext.Provider value={{ playlist, addToPlaylist, removeFromPlaylist, clearPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) throw new Error("usePlaylist must be used within a PlaylistProvider");
  return context;
};
