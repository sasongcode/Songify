import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  PlusCircle,
  Mic2,
} from "lucide-react";
import { useAudio } from "../context/AudioContext";
import { useState } from "react";

export default function MusicPlayerBar({ sidebarOpen }: { sidebarOpen: boolean }) {
  const {
    currentSong,
    isPlaying,
    volume,
    progress,
    duration,
    playNext,
    playPrev,
    togglePlay,
    setVolume,
    seek,
    repeat,
    shuffle,
    toggleRepeat,
    toggleShuffle,
  } = useAudio();

  const [showVolume, setShowVolume] = useState(false);

  const formatTime = (sec: number) =>
    isNaN(sec)
      ? "0:00"
      : `${Math.floor(sec / 60)}:${Math.floor(sec % 60)
          .toString()
          .padStart(2, "0")}`;

  const playerBaseClass = `
    fixed bottom-0 right-0
    ${sidebarOpen ? "md:left-50" : "md:left-21"}
    left-0 bg-zinc-950 border-t border-zinc-800
    p-2 flex items-center justify-between
    z-50 transition-all duration-300
  `;

  if (!currentSong)
    return (
      <div className={playerBaseClass}>
        <div className="flex items-center justify-center w-full text-zinc-400 text-sm">
          🎵 Select a song to play
        </div>
      </div>
    );

  return (
    <div className={playerBaseClass}>
      <div className="flex items-center gap-3 w-1/3 md:w-1/4">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="w-10 h-10 md:w-12 md:h-12 rounded-md object-cover"
        />
        <div className="truncate">
          <h4 className="text-sm font-semibold text-white truncate">
            {currentSong.title}
          </h4>
          <p className="text-xs text-zinc-400 truncate">{currentSong.artist}</p>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center w-2/4">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={toggleShuffle}
            className={`${shuffle ? "text-green-500" : "text-zinc-400"} hover:text-white transition`}
          >
            <Shuffle size={15} />
          </button>
          <button onClick={playPrev} className="text-zinc-400 hover:text-white transition">
            <SkipBack size={15} />
          </button>

          <button
            onClick={togglePlay}
            className="bg-white text-black rounded-full p-2 hover:scale-110 transition"
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>

          <button onClick={playNext} className="text-zinc-400 hover:text-white transition">
            <SkipForward size={15} />
          </button>

          <button
            onClick={toggleRepeat}
            className={`${repeat ? "text-green-500" : "text-zinc-400"} hover:text-white transition`}
          >
            <Repeat size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full max-w-lg">
          <span className="text-xs text-zinc-400">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full accent-white"
          />
          <span className="text-xs text-zinc-400">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex md:hidden items-center justify-center gap-4 w-1/3">
        <button className="text-zinc-400 hover:text-white transition">
          <PlusCircle size={20} />
        </button>
        <button className="text-zinc-400 hover:text-white transition">
          <Mic2 size={20} />
        </button>
        <button
          onClick={togglePlay}
          className="bg-white text-black rounded-full p-2 hover:scale-110 transition"
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>

      <div className="hidden md:flex items-center gap-3 w-1/4 justify-end">
        <button className="text-zinc-400 hover:text-white transition">
          <PlusCircle size={18} />
        </button>
        <button className="text-zinc-400 hover:text-white transition">
          <Mic2 size={18} />
        </button>

        <div className="relative flex items-center gap-2">
          <button
            onClick={() => setShowVolume((prev) => !prev)}
            className="text-zinc-400 hover:text-white transition"
          >
            {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showVolume ? "w-24 opacity-100 ml-1" : "w-0 opacity-0"
            }`}
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
