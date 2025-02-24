import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const location = useLocation();
  const exemptedRoutes = ["/signup", "/login"];

  // Determine if the current route is exempted
  const isExemptedRoute = exemptedRoutes.includes(location.pathname);

  // Apply the background style conditionally
  if (!isExemptedRoute) {
    document.body.style.backgroundImage = "linear-gradient(#081F21, #071721)";
  } else {
    document.body.style.backgroundImage = "none";
  }

  return (
    <>
      {!isExemptedRoute && <Header />}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      {/* {!isExemptedRoute && <Footer />} */}
    </>
  );
}

export default App;
