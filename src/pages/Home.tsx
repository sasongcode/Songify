import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";
import { useSearch } from "../context/SearchContext";
import SkeletonLoading from "../components/SkeletonLoading";

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

interface Album {
  id: number;
  title: string;
  cover_medium: string;
  artist: { name: string };
}

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
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

        const allTracks = res.data.tracks.data;
        const shuffled = allTracks.sort(() => 0.5 - Math.random());
        setTracks(shuffled.slice(0, 15));

        setArtists(res.data.artists.data.slice(0, 10));
        setAlbums(res.data.albums.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <SkeletonLoading />;

  return (
    <div className="space-y-16 py-10 px-4 sm:px-8">

      {/* 🎧 HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-700/50 via-blue-800/40 to-black/80 backdrop-blur-md border border-zinc-800/50 p-8 md:p-12 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-3"
            >
              🎵 Discover <span className="text-green-400">Your Sound</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-sm md:text-base max-w-md"
            >
              Experience trending music, new releases, and hidden gems — all in one place.
            </motion.p>
          </div>
          <motion.img
            src="https://static.vecteezy.com/system/resources/previews/024/044/209/original/music-icon-clipart-transparent-background-free-png.png"
            alt="Music Icon"
            className="w-44 md:w-60 opacity-90 hover:opacity-100 transition"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
      </section>

      {/* 🔥 TRENDING NOW */}
      <section>
        <SectionTitle title="🔥 Trending Now" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredTracks.slice(0, 10).map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
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

      {/* 🎤 POPULAR ARTISTS */}
      <section>
        <SectionTitle title="🎤 Popular Artists" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {artists.map((artist, index) => (
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

      {/* 💿 TOP ALBUMS */}
      <section>
        <SectionTitle title="💿 Top Albums" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.07 }}
              className="bg-zinc-900/50 p-3 rounded-xl hover:bg-zinc-800 transition border border-zinc-800"
            >
              <img
                src={album.cover_medium}
                alt={album.title}
                className="rounded-lg mb-2 object-cover aspect-square"
              />
              <h4 className="text-sm font-semibold text-white truncate">{album.title}</h4>
              <p className="text-xs text-zinc-400 truncate">{album.artist.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🎧 DISCOVER WEEKLY */}
      <section>
        <SectionTitle title="🎧 Discover Weekly" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {tracks.slice(5, 10).map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
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

      {/* 🌈 GENRE HIGHLIGHTS (BONUS) */}
      <section>
        <SectionTitle title="🌈 Genre Highlights" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {[
            { name: "Pop", color: "from-pink-500 to-purple-500" },
            { name: "Rock", color: "from-red-600 to-orange-500" },
            { name: "Hip-Hop", color: "from-yellow-400 to-red-500" },
            { name: "Jazz", color: "from-blue-400 to-cyan-400" },
            { name: "Electronic", color: "from-green-400 to-emerald-500" },
            { name: "R&B", color: "from-indigo-500 to-violet-600" },
          ].map((genre, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`rounded-2xl p-6 text-white font-semibold bg-linear-to-br ${genre.color} cursor-pointer hover:scale-105 transition`}
            >
              {genre.name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌀 RECOMMENDED */}
      <section>
        <SectionTitle title="🌀 Recommended For You" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {tracks.slice(8, 13).map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
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

      {/* FOOTER */}
      <footer className="text-center text-zinc-500 text-sm mt-10 mb-4">
        © {new Date().getFullYear()} Songify — Inspired by Spotify UI
      </footer>
    </div>
  );
}