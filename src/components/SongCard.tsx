import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useAudio } from "../context/AudioContext";

interface SongCardProps {
  id: number;
  title: string;
  artist: string;
  image: string;
  url: string;
}

export default function SongCard({
  id,
  title,
  artist,
  image,
  url,
}: SongCardProps) {
  const { playSong, currentSong, isPlaying } = useAudio();

  const isActive = currentSong?.id === id;

  const handlePlay = () => {
    playSong({ id, title, artist, image, url });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={handlePlay}
      className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300
        ${isActive
          ? "bg-linear-to-br from-green-700/40 via-green-800/20 to-zinc-900 border border-green-500/40 shadow-lg shadow-green-500/30"
          : "bg-zinc-900 hover:bg-zinc-800"}`}
    >
      {/* Gambar lagu */}
      <div className="relative">
        <motion.img
          src={image}
          alt={title}
          animate={isActive ? { scale: [1, 1.04, 1] } : {}}
          transition={isActive ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
          className={`w-full aspect-square object-cover transition-all duration-500
            ${isActive ? "opacity-90" : ""}`}
        />

        {/* Overlay tombol Play */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300
            ${isActive ? "opacity-100" : "opacity-0 hover:opacity-100"}`}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`rounded-full p-3 shadow-lg transition
              ${isActive ? "bg-green-500 text-black" : "bg-green-500 hover:bg-green-400 text-black"}`}
          >
            <Play size={18} />
          </motion.button>
        </div>

        {/* Efek Glow Aktif */}
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-green-500/10 blur-xl"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Info lagu */}
      <div className="p-3 flex items-center justify-between">
        <div>
          <h3
            className={`text-sm font-semibold truncate transition-colors duration-300
              ${isActive ? "text-green-400" : "text-white"}`}
          >
            {title}
          </h3>
          <p className="text-xs text-zinc-400 truncate">{artist}</p>
        </div>

        {/* 🔊 Equalizer mini animasi */}
        {isActive && isPlaying && (
          <motion.div
            className="flex items-end gap-0.5 h-4 w-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[1, 2, 3].map((bar) => (
              <motion.span
                key={bar}
                className="w-0.5 bg-green-400 rounded-full"
                animate={{
                  height: ["20%", "100%", "30%"],
                }}
                transition={{
                  duration: 0.5 + bar * 0.1,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
