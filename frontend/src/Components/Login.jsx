import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserCreatedPopup } from "./UserCreatedPopup";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const checkboxRef = useRef(null);
  const navigate = useNavigate();
  const message = location.state?.message || null;
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      [userDetails.email, userDetails.password].some((field) => {
        return field.trim() === "";
      })
    ) {
      setError("Please fill all the fields");
      return;
    }

    setError("");

    // Check if the checkbox is checked
    if (!checkboxRef.current.checked) {
      setError("Please agree to the Terms and Conditions");
      return;
    }

    axios
      .post("/api/login", userDetails)
      .then((res) => {
        if (res.status === 200) {
          setUserDetails({
            email: "",
            password: ""
          });
          navigate("/home", { state: { success: res.data.success } });
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <>
      {message && <UserCreatedPopup message={message} />}

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
              <p>Log in with Google</p>
            </button>

            <p className="text-center flex items-center justify-between">
              <span className="mb-4 text-rose-600 pl-1">__</span> Or Log in with
              your email <span className="mb-4 text-rose-600 pr-1">__</span>
            </p>

            <form
              className="flex flex-col"
              onSubmit={handleSubmit}
            >
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
                onChange={handleChange}
                className="border-2 rounded p-2 mt-2"
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
                onChange={handleChange}
                placeholder="********"
                className="border-2 rounded p-2 mt-2"
                autoComplete="on"
                required
              />

              {error ? (
                <p className="text-red-600 mt-2 font-semibold">{error}</p>
              ) : (
                ""
              )}

              <button
                type="submit"
                className="text-center bg-orange-500 w-full py-2 rounded my-6"
              >
                Log in
              </button>
            </form>

            <div className="flex">
              <input
                type="checkbox"
                required
                ref={checkboxRef}
                className="cursor-pointer"
              />
              <p className="mx-2">I agreed to the Terms and Conditions</p>
            </div>

            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link
                className="text-blue-400 cursor-pointer"
                to={"/signup"}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
