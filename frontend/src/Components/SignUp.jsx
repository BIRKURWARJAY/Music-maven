import { Link } from "react-router-dom";


export default function SignUp() {
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
              with your email{" "}
              <span className="mb-4 text-rose-600 pr-1">__</span>
            </p>

            <form className="flex flex-col">
              <label htmlFor="FullName">Full Name:</label>
              <input
                type="text"
                placeholder="Enter Name"
                id="FullName"
                className={`border-2 rounded p-2 mt-2 `}
                required
              />

              <label
                htmlFor="Email"
                className="mt-2"
              >
                Email:
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                id="Email"
                className="border-2 rounded p-2 mt-2"
                required
              />

              <label
                htmlFor="Password"
                className="mt-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="Password"
                placeholder="**********"
                className="border-2 rounded p-2 mt-2"
                autoComplete="on"
                required
              />

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
