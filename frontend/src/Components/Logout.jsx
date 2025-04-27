import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import useCurrentSongStore from "../../app/currentSongStore";

export default function Logout() {
  const navigate = useNavigate(); 
  const { setIsLoggedIn } = useCurrentSongStore();

  useEffect(() => {
    console.log("Logging out...");

    async function logoutUser() {
      try {
        const res = await axios.post("/api/logout");  
        if (res?.data?.message === "User logged out successfully") {
          localStorage.clear();
          localStorage.removeItem("device_Id");
          setIsLoggedIn(false);
          navigate("/login"); 
          console.log("Logged Out");
          
        } else {
          setIsLoggedIn(true);
          console.log("Error logging out");
        }
      } catch (error) {
        setIsLoggedIn(true);
        console.warn("Logout error:", error);
      }
    }

    logoutUser();
  }, []);

  // Optionally, render a loading spinner or a message while logging out
  return null;
}
