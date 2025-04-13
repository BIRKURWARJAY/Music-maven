import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";


export default function SignUp() {

  const checkboxRef = useRef(null);
  const navigate = useNavigate();

  



  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prev) => (
      {...prev, [id]: value}
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    

    // Check if any field is empty
    if ([user.username, user.email, user.password].some((field) => {
      return field.trim() === "";
    })) {
      setError("Please fill all the fields");
      return;
    }
    
    setError("");
    
    // Check if the checkbox is checked
    if(!checkboxRef.current.checked) {
      setError("Please agree to the Terms and Conditions");
      return;
    }


    axios.post("/api/register", user)
    .then((res) => {
      if (res.status === 200) {
        setUser({
          username: "",
          email: "",
          password: ""
        })
        setError("");
        checkboxRef.current.checked = false;
        navigate("/login", { state: {message: "User created successfully, please login"}});
      }
    })
    .catch((err) => {
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data.message || "Server error, please try again later");
      } else if (err.request) {
        // Request was made but no response received
        setError("Network error, please check your connection");
      } else {
        // Something else happened
        setError("An unexpected error occurred, please try again");
      }
    });




  }

  return (
    <>
      <div className="xl:mx-[20%] bg-white my-16 max-md:my-0 border p-16 max-md:px-6 max-md:py-3 max-md:border-none">
        <div className="flex divide-x-2 max-md:divide-x-0">
          <div className="flex-1 pr-16 max-md:hidden">
            <p className="font-bold animate-pulse text-xl bg-gradient-to-r from-violet-500 via-orange-300 to-fuchsia-200 bg-clip-text text-transparent">
              <span className="mr-1">
                <i className="fa-solid fa-music text-rose-500"></i>
              </span>{" "}
              Music Maven
            </p>

            <p className="font-bold text-3xl my-5 text-pretty">
              Welcome to <br /> Music Maven Online <br /> Music Streaming
              Platform
            </p>

            <p className="font-bold text-3xl my-5 text-pretty">
              Signup with your spotify Iemail
            </p>

            <img
              src="src/assets/login-music-image.jpg"
              alt="img"
            />
          </div>

          <div className="flex-1 pl-16 max-md:pl-0 content-center">
            <button
              type="button"
              className="w-full rounded text-center py-1 flex justify-around items-center border-2 max-2xl:px-4"
            >
              <i className="fa-brands fa-google-plus-g text-white bg-orange-500 p-2 rounded"></i>
              <p>Sign in with Google</p>
            </button>

            <p className="text-center flex items-center justify-between">
              <span className="mb-4 text-rose-600 pl-1">__</span> Or Sign up
              with your Spotify email{" "}
              <span className="mb-4 text-rose-600 pr-1">__</span>
            </p>

            <form className="flex flex-col" onSubmit={handleSubmit} >
              <label htmlFor="username">User Name:</label>
              <input
                type="text"
                placeholder="Enter Name"
                id="username"
                value={user.username}
                className={`border-2 rounded p-2 mt-2 `}
                onChange={handleChange}
                required
              />

              <label
                htmlFor="email"
                className="mt-2"
              >
                Email:
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                id="email"
                value={user.email}
                className="border-2 rounded p-2 mt-2"
                onChange={handleChange}
                required
              />

              <label
                htmlFor="password"
                className="mt-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={user.password}
                placeholder="**********"
                className="border-2 rounded p-2 mt-2"
                onChange={handleChange}
                autoComplete="on"
                minLength={8}
                required
              />

              {error ? (<p className="text-red-600 mt-2 font-semibold">{ error }</p>) : ("")}

              <button
                type="submit"
                className="text-center bg-orange-500 w-full py-2 rounded my-6"
              >
                Sign up
              </button>
            </form>

            <div className="flex">
              <input
                type="checkbox"
                ref={checkboxRef}
                required
                className="cursor-pointer"
              />
              <p className="mx-2">I agreed to the Terms and Conditions</p>
            </div>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-400 cursor-pointer"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
