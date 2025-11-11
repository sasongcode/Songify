import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SearchProvider } from './context/SearchContext.tsx'
import { AudioProvider } from './context/AudioContext.tsx'

createRoot(document.getElementById('root')!).render(
  <SearchProvider>
    <AudioProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AudioProvider>
  </SearchProvider>
)
