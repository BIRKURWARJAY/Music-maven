import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {

    let token = null;

    // Get access token from URL
    if (!document.cookie.includes("token")) {
      const hash = window.location.hash;
      
      token = hash.split("access_token=")[1].split("&")[0];
      const expires = Date.now() + 3600 * 1000; // 1 hour expiration time in milliseconds
  
      document.cookie = `token=${token}; expires=${expires}; path=/;`
    } else {
      token = document.cookie.split(";").find(cookie => cookie.trim().startsWith("token="))?.split("=")[1];
      console.log(token);
      
    }
    

    if (token){
      // Navigate to home
      navigate("/", { replace: true });
    } else {
      console.log("playerToken may not found or expired:::");
    }
  }, [navigate]);

  return <div className="text-white mt-28 mx-28">Redirecting...</div>;
};

export default Callback;
