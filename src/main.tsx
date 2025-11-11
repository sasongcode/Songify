import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";
import { AudioProvider } from "./context/AudioContext.tsx";
import { PlaylistProvider } from "./context/PlaylistContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchProvider>
      <AudioProvider>
        <PlaylistProvider>
          <App />
        </PlaylistProvider>
      </AudioProvider>
    </SearchProvider>
  </StrictMode>
);
