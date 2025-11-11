import { usePlaylist } from "../context/PlaylistContext";
import { motion } from "framer-motion";

export default function PlaylistPage() {
  const { playlist, removeFromPlaylist, clearPlaylist } = usePlaylist();

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Playlist 🎧</h1>
        {playlist.length > 0 && (
          <button
            onClick={clearPlaylist}
            className="text-sm text-red-400 hover:text-red-500 transition"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {playlist.length === 0 ? (
        <p className="text-zinc-400">Belum ada lagu di playlist kamu.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {playlist.map((song) => (
            <motion.div
              key={song.url}
              className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 hover:border-green-500 transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={song.image}
                alt={song.title}
                className="rounded-md mb-2 w-full h-40 object-cover"
              />
              <h4 className="text-sm font-semibold truncate">{song.title}</h4>
              <p className="text-xs text-zinc-400 truncate">{song.artist}</p>
              <button
                onClick={() => removeFromPlaylist(song.url)}
                className="text-xs text-red-400 hover:text-red-500 mt-2"
              >
                Hapus
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
