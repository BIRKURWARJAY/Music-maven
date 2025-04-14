import { Outlet, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Header from "./Components/Header";

const CurrentSong = lazy(() => import("./Components/CurrentSong"));

function App() {
  const location = useLocation();
  const exemptedRoutes = ["/signup", "/login", "/premium"];
  const isExemptedRoute = exemptedRoutes.includes(location.pathname);

  useEffect(() => {
    document.body.style.backgroundImage = isExemptedRoute
      ? "none"
      : "linear-gradient(#081F21, #071721)";
  }, [isExemptedRoute]);

  return (
    <div className="max-h-screen pb-28 relative">
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
