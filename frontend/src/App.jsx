import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer"



function App() {
  
  const location = useLocation();
  
  const exemptedRoutes = ["/signup", "/login"];

  return (
    <>
      {!exemptedRoutes.includes(location.pathname) && <Header />}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      {/* {!exemptedRoutes.includes(location.pathname) && <Footer />} */}
    </>
  );
}

export default App;
