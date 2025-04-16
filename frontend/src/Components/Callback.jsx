import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      navigate("/login");
      return;
    }
  
    const fetchTokens = async () => {
      const res = await fetch("api/getAccessToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
  
      const data = await res.json();
      
      if (data.access_token && data.refresh_token) {
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data?.refresh_token);
        localStorage.setItem("tokenExpiry", (Date.now() + data.expires_in * 1000 - 60 * 1000).toString());
        navigate("/");
      } else {
        navigate("/login");
      }
    };
  
    fetchTokens();
  }, []);
  

  return null; // Don't render anything
};

export default Callback;
