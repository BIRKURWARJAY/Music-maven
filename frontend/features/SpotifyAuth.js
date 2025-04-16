import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSpotifyAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      const tokenExpiry = parseInt(localStorage.getItem("tokenExpiry") || "0", 10);

      if (!refreshToken || !accessToken) {
        navigate("/login");
        return;
      }

      if (Date.now() >= tokenExpiry) {
        try {
          const res = await fetch("/api/refreshAccessToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });

          const data = await res.json();

          if (data.access_token) {
            const expiry = Date.now() + data.expires_in * 1000 - 60 * 1000;
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem("tokenExpiry", expiry.toString());
            console.log("ACCESS TOKEN REFRESHED");
          } else {
            navigate("/login");
          }
        } catch (err) {
          console.error("Token refresh error:", err);
          navigate("/login");
        }
      }
    };

    // Run immediately on mount
    checkAndRefreshToken();

    // Set up interval to refresh every 59 minutes
    const interval = setInterval(checkAndRefreshToken, 59 * 60 * 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [navigate]);
};

export default useSpotifyAuth;
