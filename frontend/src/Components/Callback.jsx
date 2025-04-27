import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCurrentSongStore from "../../app/currentSongStore";

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setIsLoggedIn, setWebAccessToken } = useCurrentSongStore();

  

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setWebAccessToken(null);
      navigate("/login");
      setIsLoggedIn(false);
      return;
    }
  
    const fetchTokens = async () => {
        try {
        const res = await fetch("api/getAccessToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
    
        const data = await res.json();
        
        if (data?.access_token && data?.refresh_token) {
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("refreshToken", data.refresh_token);
          localStorage.setItem("tokenExpiry", (Date.now() + data.expires_in * 1000 - 60 * 1000).toString());
          setWebAccessToken(data.access_token);
          setIsLoggedIn(true);
          navigate("/");
        } else {
          setWebAccessToken(null)
          setIsLoggedIn(false);
          navigate("/login");
        }
        } catch (error) {
          setWebAccessToken(null)
          setIsLoggedIn(false)
          console.log("error getting access Token", error);
          navigate("/login");  
      }
    };
  
    fetchTokens();
  }, []);
  

  return null; 
};

export default Callback;
