import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Header from "./Components/Header";
import useSpotifyAuth from "../features/SpotifyAuth"
import { initializeSpotifyPlayer } from "..";
import useCurrentSongStore from "../app/currentSongStore";

const CurrentSong = lazy(() => import("./Components/CurrentSong"));

function App() {
  window.onSpotifyWebPlaybackSDKReady = () => {
    initializeSpotifyPlayer();
  };

  useSpotifyAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const exemptedRoutes = ["/signup", "/login", "/premium"];
  const isExemptedRoute = exemptedRoutes.includes(location.pathname);
  const { isLoggedIn } = useCurrentSongStore();

  useEffect(() => {
    if (isLoggedIn && (location.pathname === "/login" || location.pathname === "/signup")) {
      navigate("/", {replace: true});
    }

    document.body.style.backgroundImage = isExemptedRoute
      ? "none"
      : "linear-gradient(#081F21, #071721)";
  }, [isLoggedIn, location, navigate]);

  return (
    <div className="max-h-screen relative">
      {!isExemptedRoute && <Header />}

      <Suspense fallback={<div>Loading Page...</div>}>
        <Outlet />
      </Suspense>

      {!isExemptedRoute && (
        <Suspense fallback={<div>Loading Player...</div>}>
          <div className="fixed bottom-0 left-0 w-full z-50">
            <CurrentSong />
          </div>
        </Suspense>
      )}
    </div>
  );
}

export default App;
