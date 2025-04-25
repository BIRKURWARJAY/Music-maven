import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function Logout() {
  const navigate = useNavigate(); 

  useEffect(() => {
    console.log("Logging out...");

    async function logoutUser() {
      try {
        const res = await axios.post("/api/logout");  
        if (res?.data?.message === "User logged out successfully") {
          localStorage.clear();
          navigate("/login"); 
        } else {
          console.log("Error logging out");
        }
      } catch (error) {
        console.warn("Logout error:", error);
      }
    }

    logoutUser();
  }, []);

  // Optionally, render a loading spinner or a message while logging out
  return null;
}
