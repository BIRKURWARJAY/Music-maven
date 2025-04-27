import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentSongStore from "../app/currentSongStore";

const useSpotifyAuth = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setWebAccessToken } = useCurrentSongStore();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      const tokenExpiry = parseInt(localStorage.getItem("tokenExpiry") || "0", 10);

      if (!refreshToken || !accessToken) {
        setWebAccessToken(null);
        setIsLoggedIn(false);
        return;
      } else {
        setWebAccessToken(accessToken);
        setIsLoggedIn(true);
      }


      // Check if tokenExpiry is a valid timestamp before doing the comparison
      if (tokenExpiry && Date.now() >= tokenExpiry) {
        console.log("refreshing access token");        
        try {
          const res = await fetch("/api/refreshAccessToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });

          const data = await res.json();

          if (data.access_token) {
            const expiry = Date.now() + data.expires_in * 1000 - (60 * 1000);
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem("tokenExpiry", expiry.toString());
            setWebAccessToken(data.access_token);
            setIsLoggedIn(true);
            console.log("ACCESS TOKEN REFRESHED");
          } else {
            setWebAccessToken(null);
            setIsLoggedIn(false);
            navigate("/login");
            console.log("Access Token Expired OR Not Found");            
          }
        } catch (err) {
          setWebAccessToken(null);
          setIsLoggedIn(false);
          console.error("Token refresh error:", err);
          navigate("/login");
        }
      }
    };

    // Run immediately on mount
    checkAndRefreshToken();

    // Set up interval to refresh every 59 minutes
    const interval = setInterval(checkAndRefreshToken, 59 * 60 * 1000 + 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);
};

export default useSpotifyAuth;
