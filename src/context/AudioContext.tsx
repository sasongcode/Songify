import React, { createContext, useContext, useRef, useState } from "react";

interface Song {
  title: string;
  artist: string;
  image: string;
  url: string;
}

interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  queue: Song[];
  repeat: boolean;
  shuffle: boolean;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  setVolume: (value: number) => void;
  seek: (value: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // FIX TYPE ERROR
  const audioRef = useRef<HTMLAudioElement>(null!);

  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Song[]>([]);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    if (!queue.some((s) => s.url === song.url)) {
      setQueue((prev) => [...prev, song]);
    }
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 200);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentSong) return;
    let nextIndex = queue.findIndex((s) => s.url === currentSong.url) + 1;
    if (shuffle) nextIndex = Math.floor(Math.random() * queue.length);
    if (nextIndex >= queue.length) {
      if (repeat) nextIndex = 0;
      else return;
    }
    playSong(queue[nextIndex]);
  };

  const playPrev = () => {
    if (!currentSong) return;
    let prevIndex = queue.findIndex((s) => s.url === currentSong.url) - 1;
    if (prevIndex < 0) {
      if (repeat) prevIndex = queue.length - 1;
      else return;
    }
    playSong(queue[prevIndex]);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const seek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  const handleEnded = () => {
    if (repeat && currentSong) playSong(currentSong);
    else playNext();
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  const toggleRepeat = () => setRepeat(!repeat);
  const toggleShuffle = () => setShuffle(!shuffle);

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        progress,
        duration,
        queue,
        repeat,
        shuffle,
        playSong,
        togglePlay,
        playNext,
        playPrev,
        setVolume: handleVolumeChange,
        seek,
        toggleRepeat,
        toggleShuffle,
        audioRef,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={currentSong?.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};