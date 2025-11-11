import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import PlaylistPage from "./pages/PlaylistPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="*" element={<NotFound />} />
          <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          
<Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}