import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, PlayCircle } from "lucide-react";
import SongCard from "../components/SongCard";
import SectionTitle from "../components/SectionTitle";
import SkeletonLoading from "../components/SkeletonLoading";
import { useSearch } from "../context/SearchContext";

interface Track {
  id: number;
  title: string;
  preview: string;
  artist: { name: string };
  album: { cover_medium: string };
}

export default function Trending() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const { query } = useSearch();

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await axios.get(
          "https://api.codetabs.com/v1/proxy?quest=https://api.deezer.com/chart"
        );
        setTracks(res.data.tracks.data.slice(0, 20));
      } catch (err) {
        console.error("Error fetching trending tracks:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  if (loading) return <SkeletonLoading />;

  return (
    <div className="py-10 px-4 sm:px-8 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
            <Flame className="text-orange-500" size={26} /> Trending Now
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            The hottest tracks everyone’s vibing to right now 🔥
          </p>
        </div>

        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
          alt="Trending"
          className="w-16 md:w-20 opacity-90 hover:opacity-100 transition"
          whileHover={{ rotate: 10, scale: 1.05 }}
        />
      </motion.div>

      {/* Highlight Track */}
      {filteredTracks[0] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-orange-600/40 via-zinc-900 to-zinc-950 rounded-2xl p-6 overflow-hidden border border-zinc-800/60"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={filteredTracks[0].album.cover_medium}
              alt={filteredTracks[0].title}
              className="w-40 h-40 rounded-xl shadow-lg object-cover"
            />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {filteredTracks[0].title}
              </h2>
              <p className="text-zinc-400 text-sm mb-4">
                by {filteredTracks[0].artist.name}
              </p>
              <button
                onClick={() => {
                  const audio = new Audio(filteredTracks[0].preview);
                  audio.play();
                }}
                className="flex gap-1 bg-orange-500 hover:bg-orange-400 text-black px-4 py-2 rounded-full text-sm font-semibold transition"
              >
                <PlayCircle size={20} />
                Play Preview
              </button>
            </div>
          </div>

          {/* Efek blur glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent blur-2xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}

      {/* Top Trending Tracks */}
      <section>
        <SectionTitle title="🔥 Top 20 Trending Tracks" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
          {filteredTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <SongCard
                id={track.id}
                title={track.title}
                artist={track.artist.name}
                image={track.album.cover_medium}
                url={track.preview}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-zinc-500 text-sm mt-10 mb-4">
        ⚡ Powered by Deezer API — Songify Trending 2025
      </footer>
    </div>
  );
}
