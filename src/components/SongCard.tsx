import { Play } from "lucide-react";
import { useAudio } from "../context/AudioContext";

interface SongCardProps {
  title: string;
  artist: string;
  image: string;
  url: string;
}

export default function SongCard({ title, artist, image, url }: SongCardProps) {
  const { playSong } = useAudio();

  const handlePlay = () => {
    playSong({
      title,
      artist,
      image: image,
      url,
    });
  };

  return (
    <div
      onClick={handlePlay}
      className="bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800 transition p-3 group cursor-pointer"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="rounded-lg w-full aspect-square object-cover mb-3 group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-green-500 hover:bg-green-600 duration-300 hover:duration-300 text-black rounded-full p-3 shadow-lg">
            <Play size={17} />
          </button>
        </div>
      </div>
      <h3 className="text-sm font-semibold truncate">{title}</h3>
      <p className="text-xs text-zinc-400 truncate">{artist}</p>
    </div>
  );
}
