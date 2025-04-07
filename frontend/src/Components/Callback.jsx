import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { redirectToSpotifyAuth } from "./Login";



const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const existingToken = localStorage.getItem("accessToken");
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    
    if (!existingToken || Date.now() > parseInt(tokenExpiry)) {
      redirectToSpotifyAuth();
    }
    
    if (!existingToken) {
      const hash = window.location.hash;
      const accessTokenMatch = hash.match(/access_token=([^&]*)/);

      if (accessTokenMatch && accessTokenMatch[1]) {
        const token = accessTokenMatch[1];
        const expiryTime = Date.now() + 3600 * 1000;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("tokenExpiry", expiryTime.toString());

        navigate("/", { replace: true });
      } else {
        console.log("Access token not found in URL");
        navigate("/login", { replace: true });
      }
    } else {
      navigate("/", { replace: true }); // already has a valid token
    }

  }, [navigate]);

  return null; // Don't render anything
};

export default Callback;
