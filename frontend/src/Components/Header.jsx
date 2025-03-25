import { lazy, useEffect } from "react";
import { Link } from "react-router-dom";
const SearchBar = lazy(() => import("./SearchBar"));
const Aside = lazy(() => import("./Aside"));

export default function Header() {

  let isLogged = false;

  const handleScroll = () => {
    let header = document.querySelector("header");
    if (window.scrollY > 0) {
      header.classList.add("bg-gradient-to-r", "from-customColor2", "to-black");
      header.classList.remove("bg-transparent");
    } else {
      header.classList.add("bg-transparent");
      header.classList.remove(
        "bg-gradient-to-r",
        "from-customColor2",
        "to-black"
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <Aside />
      <header className="flex fixed top-0 left-0 h-24 z-10 overflow-visible px-14 pl-1 w-full bg-transparent">
        <nav className="flex justify-between  w-full">
          <div className="flex items-center gap-6 w-full pl-8">
            <i className="fa-solid fa-bars text-white text-2xl "></i>{" "}
            {/* Logoz */}
            <div className="py-4 pl-8 flex items-center gap-6 w-[80%]">
              <p className="font-bold animate-pulse text-xl bg-gradient-to-r from-violet-500 via-orange-300 to-fuchsia-200 bg-clip-text text-transparent">
                <span className="mr-1">
                  <i className="fa-solid fa-music bg-gradient-to-r from-violet-500 via-orange-300 to-fuchsia-200 text-transparent bg-clip-text"></i>
                </span>{" "}
                Music Maven
              </p>
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center justify-end gap-6 w-[40%] ">
            <div>
              <i className="fa-brands fa-chromecast text-2xl text-rose-500 size-12 rounded-lg text-center content-center hover:bg-white hover:bg-opacity-5"></i>
              <i className="fa-solid fa-ellipsis-vertical text-2xl text-rose-500 size-12 rounded-lg text-center content-center hover:bg-white hover:bg-opacity-5"></i>
            </div>
            {!isLogged ? (
              <div className="flex items-center gap-6">
              <Link to={"/login"}>
                <button
                  type="button"
                  className="p-4 bg-white text-rose-500 hover:bg-transparent hover:ring-2 hover:ring-fuchsia-300 font-semibold text-lg rounded-full py-2 px-6"
                >
                  Log in{" "}
                </button>
              </Link>
  
              <Link to={"/signup"}>
                <button
                  type="button"
                  className="p-4 bg-white text-rose-500 hover:bg-transparent hover:ring-2 hover:ring-fuchsia-300 font-semibold text-lg rounded-full py-2 px-6"
                >
                  Sign in{" "}
                </button>
              </Link>
              </div>
            ) : (
                <div className="flex rounded-lg">
                  <i class="fa-solid fa-user text-rose-500 ring-2 ring-rose-500 rounded-full text-2xl size-10  text-center content-center"></i>
                </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
