import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";

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

export default function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) return;

      setLoading(true);
      try {
        const trackRes = await axios.get(
          `https://api.codetabs.com/v1/proxy?quest=https://api.deezer.com/search?q=${query}`
        );
        const artistRes = await axios.get(
          `https://api.codetabs.com/v1/proxy?quest=https://api.deezer.com/search/artist?q=${query}`
        );

        setTracks(trackRes.data.data.slice(0, 10));
        setArtists(artistRes.data.data.slice(0, 8));
      } catch (err) {
        console.error("Error fetching search data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  if (!query) {
    return (
      <div className="text-center mt-20 text-zinc-400">
        Ketik sesuatu untuk mencari musik atau artis 🎵
      </div>
    );
  }

if (loading) {
  return (
    <div className="space-y-12 py-10 px-4 sm:px-8">
      <SectionTitle title={`Mencari hasil untuk "${query}"...`} />

      {/* Skeleton Lagu */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Lagu</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex flex-col space-y-3 bg-zinc-800/40 rounded-xl p-3"
            >
              <div className="w-full aspect-square bg-zinc-700 rounded-lg" />
              <div className="h-4 bg-zinc-700 rounded w-3/4 mx-auto" />
              <div className="h-3 bg-zinc-700 rounded w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      </section>

      {/* Skeleton Artis */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Artis</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex flex-col items-center space-y-3 bg-zinc-800/40 rounded-xl p-3"
            >
              <div className="w-24 h-24 bg-zinc-700 rounded-full" />
              <div className="h-3 bg-zinc-700 rounded w-2/3" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


  return (
    <div className="space-y-12 py- mt-">
      <SectionTitle title={`Hasil untuk "${query}"`} />

      <section>
        <h3 className="text-xl font-semibold mb-4">Lagu</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {tracks.length > 0 ? (
            tracks.map((track) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SongCard
                  id={track.id}
                  title={track.title}
                  artist={track.artist.name}
                  image={track.album.cover_medium}
                  url={track.preview}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-zinc-400">Lagu tidak ditemukan.</p>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Artis</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {artists.length > 0 ? (
            artists.map((artist) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ArtistCard
                  name={artist.name}
                  image={artist.picture_medium}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-zinc-400">Artis tidak ditemukan.</p>
          )}
        </div>
      </section>
    </div>
  );
}