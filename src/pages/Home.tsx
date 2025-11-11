import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";
import { useSearch } from "../context/SearchContext";

interface Track {
  id: number;
  title: string;
  preview: string;
  artist: { name: string };
  album: { cover_medium: string };
}

interface Artist {
  id: number;
  name: string;
  picture_medium: string;
}

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artist, setArtist] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  const { query } = useSearch();
  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://api.codetabs.com/v1/proxy?quest=https://api.deezer.com/chart"
        );
        setTracks(res.data.tracks.data.slice(0, 10));
        setArtist(res.data.artists.data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-zinc-400 animate-pulse">
        Loading music data...
      </div>
    );

  return (
    <div className="space-y-16 py-">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-700/40 to-zinc-800/60 backdrop-blur-md border border-zinc-800/50 p-6 md:p-10">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              <span className="text-blue-300">Welcome</span> to <span className="text-green-400">Songify👋</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base">
              Listen your favorite song and find new artist today. 🎵
            </p>
          </div>
          <motion.img
            src="https://static.vecteezy.com/system/resources/previews/024/044/209/original/music-icon-clipart-transparent-background-free-png.png"
            alt="Music vibes"
            className="w-40 md:w-56 opacity-80 hover:opacity-100 transition"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 to-transparent"></div>
      </section>

      {/* Top Tracks Section */}
      <section>
        <SectionTitle title="Top Tracks" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <SongCard
                title={track.title}
                artist={track.artist.name}
                image={track.album.cover_medium}
                url={track.preview}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Artists Section */}
      <section>
        <SectionTitle title="Popular Artists" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {artist.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.08 }}
            >
              <ArtistCard name={artist.name} image={artist.picture_medium} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-zinc-500 text-sm mt-10">
        © {new Date().getFullYear()} Songify — Inspired by Spotify
      </footer>
    </div>
  );
}